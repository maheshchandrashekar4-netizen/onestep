const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/ping', (req, res) => res.send('pong'));

// On root, load index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Required endpoints
app.post('/execute', (req, res) => {
  res.json({ message: 'Execute OK' });
});

app.post('/save', (req, res) => {
  res.json({ message: 'Save OK' });
});

app.post('/validate', (req, res) => {
  res.json({ message: 'Validate OK' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
