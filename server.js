// Déclarations des variables + Création de l'instance serveur 
var express = require('express');
var server = express();
var hostname = '127.0.0.1';
var port = 80;
const fs = require('fs');
require('console-stamp')(console, '[HH:MM:ss.l]'); // Heur pour log

var json = {};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Définition URL / renvoi vers l'index
server.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Réception du post + Calcul du JSON
server.post('/result.html', function(req, res) {
    var start = req.body.start; 
    var end = req.body.end; 
    var json = {};

    console.log("Receive Post");
    for (var i = start; i <= end; i++){
        json[i] = {
            nim : (i % 3 === 0),
            buzz : (i % 5 === 0)
        }
    }

    // Export du JSON dans un fichier
    let data = JSON.stringify(json, null, 2);
    fs.writeFile('result.json', data, (err) => {
        if (err) throw err;
        console.log('Result written to JSON file');
    });

    res.sendFile( __dirname  + '/index.html');
});

// Réponse en get du json
server.get('/getResult', function(req, res){
    // Lecture du JSON et réponse
    var result = JSON.parse(fs.readFileSync('result.json', 'utf8'));
    res.json(result);
});

// Lancement de l'écoute
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});