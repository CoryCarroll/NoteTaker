// Declaring variables for my required files
const express = require('express');
const path = require('path');
const fs = require('fs');
// Assigning local port
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.get('/api/notes/:id', (req, res) => {
    let dbNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(dbNotes[Number(req.params.id)]);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

