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

// Route zum Laden von post.html
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html'));
});

// Route zum Empfangen von Name und Kommentar
app.post('/addComment', (req, res) => {
    const { name, comment } = req.body; // Extrahiere Name und Kommentar aus dem Request

    // Daten im Array speichern
    commentsArray.push({ name, comment });

    // Weiterleitung zur /read Seite
    res.redirect('/read');
});

// Route zum Laden von read.html und zum Anzeigen der Kommentare
app.get('/read', (req, res) => {
    // Dynamische HTML-Erstellung
    let htmlContent = `
        <html>
            <head>
                <title>Kommentare</title>
            </head>
            <body>
                <h1>Kommentar Sektion</h1>
                <div class="CommentSection">
    `;

    // Kommentare als Liste einfügen
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

    // Dynamische Seite senden
    res.send(htmlContent);
});

// Server starten und auf Anfragen warten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
