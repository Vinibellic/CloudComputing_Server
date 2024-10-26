// Laden der Abhängigkeiten
const express = require('express'); // Importiert Express
const path = require('path'); // Importiert das path-Modul für sichere Dateipfade
const bodyParser = require('body-parser'); // Importiert body-parser zum Verarbeiten von Formulardaten

const app = express();
const port = 2000; // Port-Nummer für den Server

// Array zur Speicherung der Kommentare
let commentsArray = [];

// Middleware zum Parsen des Request-Bodys
app.use(bodyParser.urlencoded({ extended: true }));

// Route für die Startseite (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sendet die index.html-Datei
});

// Route für post.html (Kommentar hinzufügen)
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html')); // Sendet die post.html-Datei
});

// Route für das Hinzufügen eines Kommentars
app.post('/addComment', (req, res) => {
    const { name, comment } = req.body; // Extrahiere Name und Kommentar

    // Kommentar im Array speichern
    commentsArray.push({ name, comment });

    // Weiterleitung zur Seite read.html
    res.redirect('/read');
});

// Route für read.html (Kommentare ansehen)
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

    // Kommentare aus dem Array als HTML hinzufügen
    commentsArray.forEach((entry) => {
        htmlContent += `<p><strong>${entry.name}:</strong> ${entry.comment}</p>`;
    });

    htmlContent += `
                </div>
                <br>
                <a href="/">Zurück zur Startseite</a>
            </body>
        </html>
    `;

    res.send(htmlContent); // Sendet die HTML-Antwort an den Client
});

// Server starten und auf Anfragen warten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
