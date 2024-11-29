// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'frontend' directory
app.use(express.static('frontend'));

// Load data from file
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync('data.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

// Save data to file
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data));
};

// Sample data to simulate a database
let items = loadData();

// Function to generate a unique ID
const generateId = () => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

// GET all items
app.get('/data', (req, res) => {
  res.status(200).json(items);
});

// GET a single item by ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST a new item
app.post('/data', (req, res) => {
  const newItem = {
    id: generateId(),
    name: req.body.name,
    description: req.body.description,
  };
  items.push(newItem);
  saveData(items);
  res.status(201).json(newItem);
});

// PUT to update an item
app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex !== -1) {
    items[itemIndex] = {
      id,
      name: req.body.name || items[itemIndex].name,
      description: req.body.description || items[itemIndex].description,
    };
    saveData(items);
    res.status(200).json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE an item
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    saveData(items);
    res.status(200).json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});