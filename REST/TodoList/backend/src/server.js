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
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
];


// GET all items
app.get('/data', (req, res) => {
  res.status(200).json(items);
});


// Add a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    if (!newItem || !newItem.name) {
        return res.status(400).json({ error: 'Item name is required' });
    }
    newItem.id = items.length + 1; // Generate a simple ID
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT to update an item
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;

    const itemIndex = items.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    if (!updatedItem || !updatedItem.name) {
        return res.status(400).json({ error: 'Updated item name is required' });
    }

    items[itemIndex] = { ...items[itemIndex], ...updatedItem };
    res.status(200).json(items[itemIndex]);
});

// DELETE an item
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;

    const itemIndex = items.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const deletedItem = items.splice(itemIndex, 1);
    res.status(200).json(deletedItem[0]);
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});