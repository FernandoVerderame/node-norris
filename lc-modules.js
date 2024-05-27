// Importo il modulo nativo http
const http = require("http");

// Definisco le variabili port, host e start
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Importo il modulo File System
const fs = require("fs");

// Importo il modulo Path
const path = require("path");

// Importo node-fetch per le richieste HTTP
const fetch = require("node-fetch");

// Lettura file
const readJSONData = (nomeFile) => {
    const filePath = path.join(__dirname, nomeFile + '.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
}

// Scrittura file
const writeJSONData = (nomeFile, newData) => {
    const filePath = path.join(__dirname, nomeFile + '.json');
    const fileString = JSON.stringify(newData);
    fs.writeFileSync(filePath, fileString);
}

// Validazione duplicati tramite una flag
const isDuplicate = (jokesDb, value) => {
    let found = false;
    jokesDb.forEach(j => {
        if (j.value === value) {
            found = true;
        }
    });
    return found;
}

// Creo il server
const server = http.createServer((req, res) => {
    const norrisDb = readJSONData('norrisDb');

    switch (req.url) {
        case '/favicon.ico':
            res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
            res.end();
            break;
        case '/':
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

            // API
            fetch('https://api.chucknorris.io/jokes/random')
                .then(response => response.json())
                .then(data => {
                    // Aggiungi nuova battuta a norrisDb e salvo sul file
                    if (!isDuplicate(norrisDb, data.value)) {
                        norrisDb.push({ value: data.value });
                        writeJSONData('norrisDb', norrisDb);
                    }
                    let lastJoke = norrisDb.length > 0 ? norrisDb[norrisDb.length - 1].value : "Nessuna battuta disponibile";
                    let fileHtml = `<p>${lastJoke}</p>`;
                    res.end(fileHtml);

                });
    }
});

server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});