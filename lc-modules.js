// Importo il modulo nativo http
const http = require("http");

// Definisco le variabili port, host e start
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Importo il modulo File System
const fs = require("fs");

// Importo il modulo Path
const path = require("path");