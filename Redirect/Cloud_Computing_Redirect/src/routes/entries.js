const express = require('express');
const fs = require('fs');
const path = require('path');
const { generateSlug } = require('../utils/generateSlug');

const router = express.Router();
const redirectsPath = path.join(__dirname, '../data/redirects.json');

// GET /entries
router.get('/', (req, res) => {
    const redirects = JSON.parse(fs.readFileSync(redirectsPath));
    res.json(redirects);
});

// POST /entry
router.post('/', (req, res) => {
    const { url, slug } = req.body;
    const redirects = JSON.parse(fs.readFileSync(redirectsPath));

    const newSlug = slug || generateSlug();
    redirects.push({ slug: newSlug, url });

    fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2));
    res.status(201).json({ slug: newSlug, url });
});

// DELETE /entry/:slug
router.delete('/:slug', (req, res) => {
    const slug = req.params.slug;
    let redirects = JSON.parse(fs.readFileSync(redirectsPath));

    const newRedirects = redirects.filter((r) => r.slug !== slug);
    if (newRedirects.length === redirects.length) {
        return res.status(404).json({ error: 'Slug not found' });
    }

    fs.writeFileSync(redirectsPath, JSON.stringify(newRedirects, null, 2));
    res.status(200).json({ message: 'Entry deleted' });
});

module.exports = router;
