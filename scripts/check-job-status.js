import fetch from 'node-fetch';

// RunPod API key and endpoint ID
const RUNPOD_API_KEY = 'rpa_TFC7TGD9JOAJAJFLFUG8OKEKSV2UX58ZMTBVIZFE0o5jg5';
const RUNPOD_ENDPOINT_ID = 'wez710zm520y1v';

// Job ID to check - replace with the job ID from the previous test
const JOB_ID = 'c06358e9-c65f-4412-9aa6-f6641dd646ad-e2';

async function checkJobStatus() {
  try {
    console.log(`Checking status of job ${JOB_ID}...`);
    const response = await fetch(`https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/status/${JOB_ID}`, {
      headers: {
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Status check successful!');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Status check failed:', error.message);
    return null;
  }
}

checkJobStatus(); 