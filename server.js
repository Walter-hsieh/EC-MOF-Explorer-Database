const express = require('express');
const path = require('path'); // <-- This line is now fixed
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, images) from the current directory
app.use(express.static(__dirname));

// A simple route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});