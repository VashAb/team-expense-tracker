import express from 'express';

const app = express();
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

console.log('Backend placeholder ready');
