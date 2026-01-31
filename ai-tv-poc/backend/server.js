const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ALWAYS use process.env, never raw variable names
const LEMONSLICE_API_KEY = process.env.LEMONSLICE_API_KEY || process.env.sk_lemon_Tleyq2zh6NoMpllEHf7mYNRxzIED6YcP;

console.log('API Key loaded:', LEMONSLICE_API_KEY ? 'YES' : 'NO');
console.log('Key length:', LEMONSLICE_API_KEY ? LEMONSLICE_API_KEY.length : 0);

const AGENT_ID = 'agent_1db77d60ec132469';

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    envLoaded: !!LEMONSLICE_API_KEY,
    envVarNames: Object.keys(process.env).filter(k => k.includes('LEMON') || k.includes('lemon')),
    nodeVersion: process.version
  });
});

app.post('/api/create-room', async (req, res) => {
  try {
    if (!LEMONSLICE_API_KEY) {
      console.error('Missing API key');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured',
        availableEnvVars: Object.keys(process.env)
      });
    }

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
    
    res.json({
      success: true,
      room_url: response.data.room_url,
      token: response.data.token,
      room_id: response.data.room_id
    });
    
  } catch (error) {
    console.error('Create room error:', error.message);
    res.status(500).json({
      error: 'Failed to create room',
      message: error.message,
      details: error.response?.data || null
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI TV Network Backend',
    status: 'running',
    endpoints: ['GET /api/health', 'POST /api/create-room'],
    envCheck: !!LEMONSLICE_API_KEY ? 'OK' : 'MISSING API KEY'
  });
});

module.exports = app;