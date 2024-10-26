// Laden der Abhängigkeiten
const express = require('express'); // importiert Express
const path = require('path'); // importiert path modul damit safe ist dass index.html aus korrektem pfad geladen
const bodyParser = require('body-parser'); //liest text aus HTTP body und wandelt in JS Objekt um

// Erstellen der Expres App und festlegung port
const app = express();
const port = 2000; 

// Array zur Speicherung der Formulardaten
let formDataArray = [];

// Übersetzer zum Parsen des Request-Bodys
app.use(bodyParser.urlencoded({ extended: true }));

// Route für das Formular in index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route zum Empfangen der Formulardaten
// POST Endpunkt
app.post('/submit', (req, res) => {
  const formData = req.body.inputField; // Name des Input-Feldes im Formular

  // Daten im Array speichern
  formDataArray.push(formData);

  // Erfolgsmeldung senden
  res.send('Daten erfolgreich empfangen und gespeichert!<br><a href="/">Zurück</a>');
});

// Route für die Seite post.html zum Anzeigen der gespeicherten Daten
app.get('/post', (req, res) => {
    let htmlContent = `
      <html>
        <head>
          <title>Gespeicherte Daten</title>
        </head>
        <body>
          <h1>Gespeicherte Daten</h1>
          <ul>
    `;

// Alle Einträge im formDataArray als Liste anzeigen
formDataArray.forEach((data) => {
    htmlContent += `<li>${data}</li>`;
  });

  htmlContent += `
  </ul>
  <br><a href="/">Zurück zum Formular</a>
</body>
</html>
`;

// Antwort mit den HTML-Inhalten senden
res.send(htmlContent);
});

// Server starten und auf Anfragen warten
app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});