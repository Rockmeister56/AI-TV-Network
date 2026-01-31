const express = require('express');
const axios = require('axios');

const app = express();

// Simple CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

// CORRECT WAY: Get from environment
const LEMONSLICE_API_KEY = process.env.LEMONSLICE_API_KEY;

// Debug log
console.log('Server starting...');
console.log('Environment variable LEMONSLICE_API_KEY exists?', !!LEMONSLICE_API_KEY);
if (LEMONSLICE_API_KEY) {
  console.log('Key length:', LEMONSLICE_API_KEY.length);
  console.log('Key starts with:', LEMONSLICE_API_KEY.substring(0, 10) + '...');
}

const AGENT_ID = 'agent_1db77d60ec132469';

app.get('/api/health', (req, res) => {
  console.log('Health check called');
  
  // List all environment variables that might contain the key
  const envVars = Object.keys(process.env)
    .filter(key => key.includes('API') || key.includes('KEY') || key.includes('LEMON'))
    .reduce((obj, key) => {
      obj[key] = process.env[key] ? '***SET***' : 'NOT SET';
      return obj;
    }, {});
  
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: {
      LEMONSLICE_API_KEY: LEMONSLICE_API_KEY ? '***SET***' : 'NOT SET',
      allApiKeys: envVars,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

app.post('/api/create-room', async (req, res) => {
  try {
    console.log('Create room called');
    
    if (!LEMONSLICE_API_KEY) {
      console.error('ERROR: LEMONSLICE_API_KEY is not set!');
      console.log('Available env vars:', Object.keys(process.env));
      
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured. Please check environment variables.',
        hint: 'Set LEMONSLICE_API_KEY in Vercel environment variables',
        availableEnvVars: Object.keys(process.env).filter(k => 
          k.includes('API') || k.includes('KEY') || k.includes('LEMON')
        )
      });
    }
    
    console.log('Making API call with key starting with:', LEMONSLICE_API_KEY.substring(0, 10) + '...');
    
    const response = await axios.post(
      'https://lemonslice.com/api/liveai/rooms',
      { agent_id: AGENT_ID },
      {
        headers: {
          'X-API-Key': LEMONSLICE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Room created successfully');
    
    res.json({
      success: true,
      room_url: response.data.room_url,
      token: response.data.token,
      room_id: response.data.room_id
    });
    
  } catch (error) {
    console.error('Create room error:', error.message);
    console.error('Error details:', error.response?.data || error.stack);
    
    res.status(500).json({
      error: 'Failed to create room',
      message: error.message,
      details: error.response?.data || null,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI TV Network Backend',
    status: 'running',
    note: 'Check /api/health for environment status',
    endpoints: [
      'GET  /api/health',
      'POST /api/create-room'
    ]
  });
});

// Export for Vercel
module.exports = app;