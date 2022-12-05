const express = require("express");
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { success } = require('./helper.js');
const mydb = require('./db');

// Server info and instance
const app = express();
const port = 3000;



// les middlewares
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));


// les methodes de l'API
app.get('/', (req, res) => {res.send("Hello Express 2 !");});
app.get('/api/pokemon/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let pokemon = mydb.find(db => db.id === id);
    let message = "Un pokemon est trouvé !";

    res.json(success(message, pokemon));
});
app.get('/api/pokemons/', (req, res) => {
    res.json(success("Voici la liste des pokemons",  mydb));
});


// Server web
app.listen(port, () => console.log("Notre application Node est start sur http://localhost:" + port));