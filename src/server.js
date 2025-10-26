require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.DOMAIN_URL] 
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../build')));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Proxy endpoint for OpenAI API
app.post('/api/chat', async (req, res) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] [${requestId}] Received chat request`);
  console.log(`[${timestamp}] [${requestId}] Request body:`, JSON.stringify(req.body, null, 2));
  
  try {
    console.log(`[${timestamp}] [${requestId}] Making request to OpenAI API...`);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    console.log(`[${timestamp}] [${requestId}] OpenAI API response status: ${response.status}`);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(`[${timestamp}] [${requestId}] Successfully received response from OpenAI`);
      console.log(`[${timestamp}] [${requestId}] Response length: ${JSON.stringify(data).length} characters`);
    } else {
      console.error(`[${timestamp}] [${requestId}] OpenAI API error:`, data);
    }
    
    res.json(data);
  } catch (error) {
    console.error(`[${timestamp}] [${requestId}] Error occurred:`, error.message);
    console.error(`[${timestamp}] [${requestId}] Error stack:`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Health check requested`);
  res.json({ 
    status: 'healthy', 
    timestamp: timestamp,
    uptime: process.uptime()
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ ERROR: OPENAI_API_KEY environment variable is not set!');
  console.error('Please create a .env file with your OpenAI API key:');
  console.error('OPENAI_API_KEY=your_actual_api_key_here');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🚀 Tea Brewing API Proxy Server started`);
  console.log(`[${timestamp}] 📍 Server running on port ${PORT}`);
  console.log(`[${timestamp}] 🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`[${timestamp}] 🔗 Health check available at http://localhost:${PORT}/health`);
  console.log(`[${timestamp}] 💬 Chat endpoint available at http://localhost:${PORT}/api/chat`);
});