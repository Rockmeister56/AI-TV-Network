require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for your Netlify domain
app.use(cors({
  origin: ['https://aitvnetwork.netlify.app', 'http://localhost:8080'],
  credentials: true
}));

app.use(express.json());

// Get API key from environment (Vercel will provide this)
const LEMONSLICE_API_KEY = process.env.LEMONSLICE_API_KEY=sk_lemon_Tleyq2zh6NoMpllEHf7mYNRxzIED6YcP;
const AGENT_ID = 'agent_1db77d60ec132469';
const LEMONSLICE_API_URL = 'https://lemonslice.com/api/liveai/rooms';

// Store active rooms for cleanup
let activeRooms = {};

// 1. CREATE ROOM ENDPOINT
app.post('/api/create-room', async (req, res) => {
    try {
        console.log('Creating LemonSlice room...');
        
        // Cleanup old rooms first
        const now = Date.now();
        for (const [roomId, timestamp] of Object.entries(activeRooms)) {
            if (now - timestamp > 30 * 60 * 1000) { // 30 minutes old
                delete activeRooms[roomId];
            }
        }
        
        const response = await axios.post(
            LEMONSLICE_API_URL,
            { 
                agent_id: AGENT_ID,
                properties: {
                    max_participants: 5,
                    exp: Math.floor(Date.now() / 1000) + 1800 // 30 min expiry
                }
            },
            {
                headers: {
                    'X-API-Key': LEMONSLICE_API_KEY=sk_lemon_Tleyq2zh6NoMpllEHf7mYNRxzIED6YcP,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Store room ID for tracking
        if (response.data.room_id) {
            activeRooms[response.data.room_id] = Date.now();
        }
        
        console.log('Room created:', response.data.room_url);
        res.json({
            room_url: response.data.room_url,
            token: response.data.token,
            room_id: response.data.room_id,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error creating room:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to create room',
            details: error.response?.data || error.message 
        });
    }
});

// 2. HEALTH CHECK
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Backend running on Vercel',
        timestamp: new Date().toISOString(),
        activeRooms: Object.keys(activeRooms).length
    });
});

// 3. CLEANUP ENDPOINT
app.post('/api/cleanup', (req, res) => {
    const count = Object.keys(activeRooms).length;
    activeRooms = {};
    res.json({ 
        message: `Cleaned up ${count} rooms`,
        timestamp: new Date().toISOString()
    });
});

// 4. ROOT ENDPOINT
app.get('/', (req, res) => {
    res.json({ 
        message: 'AI TV Network Backend API',
        endpoints: [
            'POST /api/create-room',
            'GET  /api/health',
            'POST /api/cleanup'
        ],
        frontend: 'https://aitvnetwork.netlify.app'
    });
});

// Vercel will provide the PORT
const PORT = process.env.PORT || 3001;

// Only start server if not on Vercel (Vercel runs it differently)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`🚀 Backend server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;