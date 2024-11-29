// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data to simulate a database
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
];

// Function to generate a unique ID
const generateId = () => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

// GET all items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// GET a single item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT to update an item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex !== -1) {
    items[itemIndex] = {
      id,
      name: req.body.name || items[itemIndex].name,
      description: req.body.description || items[itemIndex].description,
    };
    res.status(200).json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE an item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
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
