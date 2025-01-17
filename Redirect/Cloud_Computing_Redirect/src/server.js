const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Middlewares & Routes
const authenticate = require('./middlewares/authenticate');
const entriesRouter = require('./routes/entries');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/entries', authenticate, entriesRouter);

// GET /:slug
app.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    const redirects = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'redirects.json')));

    const entry = redirects.find((r) => r.slug === slug);
    if (entry) {
        return res.redirect(entry.url);
    }
    return res.status(404).json({ error: 'Slug not found' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
