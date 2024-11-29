const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 2000;

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/build')));

let items = loadData();

function loadData() {
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

function generateId() {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

// GET all items
app.get('/api/data', (req, res) => {
  res.status(200).json(items);
});

// GET a single item by ID
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST a new item
app.post('/api/data', (req, res) => {
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
app.put('/api/data/:id', (req, res) => {
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
app.delete('/api/data/:id', (req, res) => {
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

// Serve index.html as the default file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});