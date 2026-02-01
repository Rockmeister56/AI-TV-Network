const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ CORRECT: Get from environment variables
const LEMONSLICE_API_KEY = process.env.LEMONSLICE_API_KEY;

console.log('=== SERVER STARTED ===');
console.log('API Key loaded successfully:', LEMONSLICE_API_KEY ? 'YES' : 'NO');
console.log('Key length:', LEMONSLICE_API_KEY ? LEMONSLICE_API_KEY.length : 0);

const AGENT_ID = 'agent_1db77d60ec132469';

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: {
      LEMONSLICE_API_KEY: LEMONSLICE_API_KEY ? '✅ SET' : '❌ MISSING',
      nodeEnv: process.env.NODE_ENV
    }
  });
});

app.post('/api/create-room', async (req, res) => {
  try {
    console.log('=== CREATE ROOM CALLED ===');
    console.log('Using API key:', LEMONSLICE_API_KEY.substring(0, 10) + '...');
    
    if (!LEMONSLICE_API_KEY) {
      throw new Error('LEMONSLICE_API_KEY environment variable is not set');
    }

    const response = await axios.post(
      'https://lemonslice.com/api/liveai/rooms',
      { agent_id: AGENT_ID },
      {
        headers: {
          'X-API-Key': LEMONSLICE_API_KEY,  // ✅ Using the environment variable
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Room created successfully:', response.data.room_url);
    
    res.json({
      success: true,
      room_url: response.data.room_url,
      token: response.data.token,
      room_id: response.data.room_id
    });
    
  } catch (error) {
    console.error('=== CREATE ROOM ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    console.error('Error stack:', error.stack);
    
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
    endpoints: [
      'GET  /api/health',
      'POST /api/create-room'
    ],
    note: 'Visit /api/health to check server status'
  });
});

// Export for Vercel
module.exports = app;