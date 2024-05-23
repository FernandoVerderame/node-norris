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