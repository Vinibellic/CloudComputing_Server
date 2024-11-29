// Module laden
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 2000;

// Kommentar-Array
let commentsArray = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routen
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/post', (req, res) => res.sendFile(path.join(__dirname, 'post.html')));
app.get('/memegen', (req, res) => res.sendFile(path.join(__dirname, 'memegen.html')));

app.post('/addComment', (req, res) => {
    const { name, comment } = req.body;
    commentsArray.push({ name, comment });
    res.redirect('/read');
});

app.get('/read', (req, res) => {
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kommentare</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body class="bg-success text-white">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">Commentary</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item"><a class="nav-link" href="/post">Kommentar hinzufügen</a></li>
                            <li class="nav-item"><a class="nav-link" href="/read">Kommentare ansehen</a></li>
                            <li class="nav-item"><a class="nav-link" href="/memegen">Memegenerator</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container mt-5">
                <h1 class="text-center mb-4">Kommentar Sektion</h1>
                ${commentsArray.map(entry => `
                    <div class="card mb-3 bg-dark text-white">
                        <div class="card-body">
                            <h5 class="card-title">${entry.name}</h5>
                            <p class="card-text">${entry.comment}</p>
                        </div>
                    </div>`).join('')}
                <div class="text-center mt-4"><a href="/" class="btn btn-light">Zurück zur Startseite</a></div>
            </div>
        </body>
        </html>
    `;
    res.send(htmlContent);
});

app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
