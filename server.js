// Laden der Abhängigkeiten
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 2000;

// Array zur Speicherung der Kommentare
let commentsArray = [];

// Middleware zum Parsen des Request-Bodys
app.use(bodyParser.urlencoded({ extended: true }));

// Route zum Laden von post.html über die Root-Route
app.get('/', (req, res) => {
    res.redirect('/post'); // Leitet von '/' zur '/post' Seite weiter
});

// Route zum Laden von post.html direkt
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html'));
});

// Route zum Empfangen von Name und Kommentar
app.post('/addComment', (req, res) => {
    const { name, comment } = req.body;

    // Speichern des Kommentars im Array
    commentsArray.push({ name, comment });

    // Weiterleitung zur /read Seite
    res.redirect('/read');
});

// Route zum Laden von read.html und zum Anzeigen der Kommentare
app.get('/read', (req, res) => {
    let htmlContent = `
        <html>
            <head>
                <title>Kommentare</title>
            </head>
            <body>
                <h1>Kommentar Sektion</h1>
                <div class="CommentSection">
    `;

    // Alle Kommentare im Array als HTML hinzufügen
    commentsArray.forEach((entry) => {
        htmlContent += `<p><strong>${entry.name}:</strong> ${entry.comment}</p>`;
    });

    htmlContent += `
                </div>
                <br>
                <a href="/post">Neuen Kommentar hinzufügen</a>
            </body>
        </html>
    `;

    res.send(htmlContent);
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
