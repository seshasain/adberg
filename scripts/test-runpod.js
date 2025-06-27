import fetch from 'node-fetch';

// RunPod API key and endpoint ID - replace with your actual values
const RUNPOD_API_KEY = 'rpa_TFC7TGD9JOAJAJFLFUG8OKEKSV2UX58ZMTBVIZFE0o5jg5';
const RUNPOD_ENDPOINT_ID = 'wez710zm520y1v';

// Test the health endpoint
async function testRunPodHealth() {
  try {
    console.log('Testing RunPod health endpoint...');
    const response = await fetch(`https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/health`, {
      headers: {
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Health check successful!');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

// Test a simple run request
async function testRunPodRun() {
  try {
    console.log('\nTesting RunPod run endpoint...');
    const response = await fetch(`https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNPOD_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: {
          // Simple test input - adjust based on your endpoint's requirements
          test: true,
          message: 'Hello from test script'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Run request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Run request successful!');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Run request failed:', error.message);
    return false;
  }
}

// Run the tests
async function runTests() {
  const healthOk = await testRunPodHealth();
  
  if (healthOk) {
    await testRunPodRun();
  }
}

runTests(); 