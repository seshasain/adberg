// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "skin-refiner-status" up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the RunPod API key from environment variables
    const runpodApiKey = Deno.env.get('RUNPOD_API_KEY');
    if (!runpodApiKey) {
      throw new Error("RunPod API key not found in environment variables");
    }

    // Create Supabase client with the user's auth context
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Get the user from the request
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }

    // Parse the request to get the project ID
    const { projectId } = await req.json();
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    // Get the project from the database
    const { data: project, error: projectError } = await supabaseClient
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', user.id) // Ensure the user owns the project
      .single();

    if (projectError) {
      throw new Error(`Failed to fetch project: ${projectError.message}`);
    }

    if (!project) {
      throw new Error(`Project not found or you don't have access to it`);
    }

    // Get the RunPod job ID from the project data
    const runpodJobId = project.project_data?.runpod_job_id;
    if (!runpodJobId) {
      throw new Error("RunPod job ID not found in project data");
    }

    // Check the status of the job directly from RunPod
    const runpodResponse = await fetch(`https://api.runpod.ai/v2/skin-refiner/status/${runpodJobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${runpodApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!runpodResponse.ok) {
      throw new Error(`RunPod API error: ${await runpodResponse.text()}`);
    }

    const runpodData = await runpodResponse.json();
    console.log("RunPod status response:", runpodData);

    // If the job is completed, update the project in the database
    if (runpodData.status === 'COMPLETED' && project.status !== 'completed') {
      const { error: updateError } = await supabaseClient
        .from('projects')
        .update({
          status: 'completed',
          project_data: {
            ...project.project_data,
            refined_image_url: runpodData.output?.refined_image_url,
            completed_at: new Date().toISOString()
          }
        })
        .eq('id', projectId);

      if (updateError) {
        throw new Error(`Failed to update project: ${updateError.message}`);
      }
    } else if (runpodData.status === 'FAILED' && project.status !== 'failed') {
      const { error: updateError } = await supabaseClient
        .from('projects')
        .update({
          status: 'failed',
          project_data: {
            ...project.project_data,
            error_message: runpodData.error || 'Unknown error',
            failed_at: new Date().toISOString()
          }
        })
        .eq('id', projectId);

      if (updateError) {
        throw new Error(`Failed to update project: ${updateError.message}`);
      }
    }

    return new Response(JSON.stringify({
      projectStatus: project.status,
      runpodStatus: runpodData.status,
      output: runpodData.output
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Status check error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
}); 