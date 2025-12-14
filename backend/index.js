const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { CORS_ORIGIN } = require('./config');

console.log('Loaded backend config:', { CORS_ORIGIN });

const ID = uuidv4();
const PORT = process.env.PORT || 8080; // ECS can override, otherwise 8080

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Health/root endpoint (optional but useful)
app.get('/', (req, res) => {
  console.log(`${new Date().toISOString()} GET /`);
  res.json({ status: 'ok', id: ID });
});

// Main API endpoint the frontend will call: http://<ALB_DNS>/api
app.get('/api', (req, res) => {
  console.log(`${new Date().toISOString()} GET /api`);
  res.json({ message: `SUCCESS ${ID}` });
});

// Catch-all (optional – if you like the old behavior)
app.get(/.*/, (req, res) => {
  console.log(`${new Date().toISOString()} GET ${req.path}`);
  res.json({ message: `SUCCESS ${ID}` });
});

// IMPORTANT: bind to 0.0.0.0 so it’s reachable inside the container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend started on port ${PORT}. ctrl+c to exit`);
  console.log(`CORS_ORIGIN: ${CORS_ORIGIN}`);
});
