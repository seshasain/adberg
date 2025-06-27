// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "skin-refiner-webhook" up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse the webhook payload
    const webhookData = await req.json();
    console.log("Received webhook data:", webhookData);

    // Extract the project ID and job status from the webhook data
    const { project_id, status, output } = webhookData;
    
    if (!project_id) {
      throw new Error("Project ID not found in webhook data");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { 'X-Client-Info': 'skin-refiner-webhook' } } }
    );

    // Get the current project data
    const { data: project, error: fetchError } = await supabaseClient
      .from('projects')
      .select('*')
      .eq('id', project_id)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch project: ${fetchError.message}`);
    }

    if (!project) {
      throw new Error(`Project not found: ${project_id}`);
    }

    // Update the project based on the job status
    let projectStatus = 'processing';
    let projectData = project.project_data || {};
    
    if (status === 'COMPLETED') {
      projectStatus = 'completed';
      projectData = {
        ...projectData,
        refined_image_url: output.refined_image_url,
        completed_at: new Date().toISOString()
      };
    } else if (status === 'FAILED') {
      projectStatus = 'failed';
      projectData = {
        ...projectData,
        error_message: output?.error || 'Unknown error',
        failed_at: new Date().toISOString()
      };
    }

    // Update the project in the database
    const { error: updateError } = await supabaseClient
      .from('projects')
      .update({
        status: projectStatus,
        project_data: projectData
      })
      .eq('id', project_id);

    if (updateError) {
      throw new Error(`Failed to update project: ${updateError.message}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
}); 