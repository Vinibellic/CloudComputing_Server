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

// Middleware zum Bereitstellen statischer Dateien (wie CSS)
app.use(express.static(path.join(__dirname))); // Statische Dateien im aktuellen Verzeichnis bereitstellen

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
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <title>Kommentare</title>
        </head>
        <body class="bg-success text-white">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="#">Commentary</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/post">Kommentar hinzufügen</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/read">Kommentare ansehen</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/test">Testseite</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container mt-5">
                <h1 class="text-center mb-4">Kommentar Sektion</h1>
                <div class="CommentSection">
    `;

    // Kommentare aus dem Array als HTML hinzufügen
    commentsArray.forEach((entry) => {
        htmlContent += `
            <div class="card mb-3 bg-dark text-white">
                <div class="card-body">
                    <h5 class="card-title">${entry.name}</h5>
                    <p class="card-text">${entry.comment}</p>
                </div>
            </div>
        `;
    });

    htmlContent += `
                </div>
                <div class="text-center mt-4">
                    <a href="/" class="btn btn-light">Zurück zur Startseite</a>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;

    res.send(htmlContent); // Sendet die HTML-Antwort an den Client
});

// Server starten und auf Anfragen warten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
