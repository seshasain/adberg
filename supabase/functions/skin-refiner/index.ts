// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "skin-refiner" up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // --- B2 Setup ---
    const b2BucketName = Deno.env.get('B2_IMAGE_BUCKET_NAME');
    const b2Endpoint = Deno.env.get('B2_ENDPOINT');
    const b2AccessKeyId = Deno.env.get('B2_ACCESS_KEY_ID');
    const b2SecretAccessKey = Deno.env.get('B2_SECRET_ACCESS_KEY');
    const b2BucketId = Deno.env.get('B2_IMAGE_BUCKET_ID');

    if (!b2BucketName || !b2Endpoint || !b2AccessKeyId || !b2SecretAccessKey || !b2BucketId) {
        throw new Error("B2 environment variables are not set.");
    }

    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Get the user from the request.
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    
    // --- 1. TODO: Credit Handling ---
    // We will add logic here to check and decrement user credits.

    // --- 2. Parse Form Data ---
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    const faceParsingOptions = JSON.parse(formData.get('options') as string);
    
    if (!imageFile) {
        throw new Error('No image file provided.');
    }

    // --- 3. Upload image to B2 using direct API ---
    const imageBuffer = await imageFile.arrayBuffer();
    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = `${user.id}/${fileName}`;
    
    // Step 1: Get B2 authorization token
    const authResponse = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
      headers: {
        'Authorization': `Basic ${btoa(`${b2AccessKeyId}:${b2SecretAccessKey}`)}`
      }
    });
    
    if (!authResponse.ok) {
      throw new Error(`B2 authorization failed: ${await authResponse.text()}`);
    }
    
    const authData = await authResponse.json();
    const { authorizationToken, apiUrl } = authData;
    
    // Step 2: Get upload URL
    const uploadUrlResponse = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
      method: 'POST',
      headers: {
        'Authorization': authorizationToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bucketId: b2BucketId
      })
    });
    
    if (!uploadUrlResponse.ok) {
      throw new Error(`Failed to get B2 upload URL: ${await uploadUrlResponse.text()}`);
    }
    
    const uploadUrlData = await uploadUrlResponse.json();
    const { uploadUrl, authorizationToken: uploadAuthToken } = uploadUrlData;
    
    // Step 3: Upload the file
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': uploadAuthToken,
        'Content-Type': imageFile.type,
        'X-Bz-File-Name': encodeURIComponent(filePath),
        'X-Bz-Content-Sha1': 'do_not_verify', // In production, compute actual SHA1
      },
      body: new Uint8Array(imageBuffer)
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`B2 upload failed: ${await uploadResponse.text()}`);
    }
    
    const uploadData = await uploadResponse.json();

    // --- 4. Create Project in Database ---
    const { data: project, error: projectError } = await supabaseClient
      .from('projects')
      .insert({
        user_id: user.id,
        tool_id: 'd5fed7e9-3dd8-4071-818c-e90bebc2e54f',
        title: `Skin Refiner - ${new Date().toLocaleString()}`,
        status: 'processing',
        project_data: {
          original_image_key: filePath,
          face_parsing_options: faceParsingOptions,
        }
      })
      .select()
      .single();

    if (projectError) {
      throw new Error(`Database error: ${projectError.message}`);
    }

    // --- 5. Call RunPod API ---
    const runpodApiKey = Deno.env.get('RUNPOD_API_KEY');
    if (!runpodApiKey) {
      throw new Error("RunPod API key not found in environment variables");
    }

    // Get the RunPod endpoint ID
    const runpodEndpointId = Deno.env.get('RUNPOD_ENDPOINT_ID');
    if (!runpodEndpointId) {
      throw new Error("RunPod endpoint ID not found in environment variables");
    }

    console.log(`Using RunPod endpoint ID: ${runpodEndpointId}`);
    console.log(`RunPod API key is configured: ${runpodApiKey ? 'Yes' : 'No'}`);

    // Prepare the payload for RunPod
    const runpodPayload = {
      input: {
        image_object_key: filePath,
        face_parsing_options: faceParsingOptions,
        webhook_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/skin-refiner-webhook`,
        project_id: project.id
      }
    };

    // Call RunPod API
    console.log("Calling RunPod API with payload:", JSON.stringify(runpodPayload));
    let runpodResponse;
    try {
      const runpodUrl = `https://api.runpod.ai/v2/${runpodEndpointId}/run`;
      console.log(`Making request to RunPod URL: ${runpodUrl}`);
      
      runpodResponse = await fetch(runpodUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${runpodApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(runpodPayload)
      });

      if (!runpodResponse.ok) {
        const responseText = await runpodResponse.text();
        console.error(`RunPod API error: Status ${runpodResponse.status}, Response: ${responseText}`);
        throw new Error(`RunPod API error: Status ${runpodResponse.status}, Response: ${responseText}`);
      }
    } catch (runpodError) {
      console.error("RunPod API call failed:", runpodError);
      throw new Error(`RunPod API call failed: ${runpodError.message}`);
    }

    const runpodData = await runpodResponse.json();
    console.log("RunPod response:", JSON.stringify(runpodData));

    // Update the project with the RunPod job ID
    const { error: updateError } = await supabaseClient
      .from('projects')
      .update({
        project_data: {
          ...project.project_data,
          runpod_job_id: runpodData.id
        }
      })
      .eq('id', project.id);

    if (updateError) {
      throw new Error(`Failed to update project with RunPod job ID: ${updateError.message}`);
    }

    const responsePayload = {
      message: "Processing started!",
      image_object_key: filePath,
      projectId: project.id,
      runpodJobId: runpodData.id
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    
    // Determine the type of error and provide a specific error message
    let errorMessage = "An unknown error occurred";
    let statusCode = 400;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific error types
      if (errorMessage.includes("B2 environment variables")) {
        errorMessage = "Storage configuration error: B2 environment variables are not properly configured.";
        statusCode = 500;
      } else if (errorMessage.includes("RunPod API key")) {
        errorMessage = "AI service configuration error: RunPod API key is missing.";
        statusCode = 500;
      } else if (errorMessage.includes("RunPod endpoint ID")) {
        errorMessage = "AI service configuration error: RunPod endpoint ID is missing.";
        statusCode = 500;
      } else if (errorMessage.includes("B2 authorization failed")) {
        errorMessage = "Storage access error: Failed to authenticate with B2 storage.";
        statusCode = 500;
      } else if (errorMessage.includes("B2 upload failed")) {
        errorMessage = "Storage upload error: Failed to upload image to B2 storage.";
        statusCode = 500;
      } else if (errorMessage.includes("Database error")) {
        errorMessage = "Database error: Failed to create project record.";
        statusCode = 500;
      } else if (errorMessage.includes("RunPod API error")) {
        errorMessage = "AI service error: Failed to connect to RunPod API.";
        statusCode = 502;
      } else if (errorMessage.includes("User not found")) {
        errorMessage = "Authentication error: User not found or not authenticated.";
        statusCode = 401;
      } else if (errorMessage.includes("No image file provided")) {
        errorMessage = "Input error: No image file was provided.";
        statusCode = 400;
      }
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: statusCode,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/skin-refiner' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
