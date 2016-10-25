/**
 * Created by Wizao on 22-10-2016.
 */
var express = require('express');
var path = require('path');
var app = express();
const fs = require("fs");

var port = process.env.PORT || 3000; // Si no tenemos el puerto en nuestro enviroment usará puerto 3000

var noticiasRutas = express.Router();

var Noticias;


app.use(express.static(__dirname + '/public'));

// Recordar que es una llamada asíncrona
fs.readFile("Noticias.txt", readDoneCallback);

// Por convencion el primer argumento es objeto JavaScript Error
// dataBuffer es un objeto de tipo Buffer
function readDoneCallback(error, dataBuffer) {
    if (!error) {
        Noticias = JSON.parse(dataBuffer)
        console.log(Noticias[0].titulo);
    }
}


noticiasRutas.route('/Noticias')
    .get(function(req,res){
        res.json(Noticias);
    });

noticiasRutas.route('/Noticias/:noticiasId')
    .get(function(req,res){
        var noticia;
        var query = req.params.noticiasId;
        for( var i in Noticias){
            if( Noticias[i].id == query ){
                noticia = Noticias[i];
            }
        }
        if(!noticia){
            res.json('Error Noticia no Encontrada');
        }
        res.json(noticia);
    });

app.use('/api', noticiasRutas);

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/public/main.html'));
});

app.listen( port, function(){
   console.log('Servidor Corriendo en puerto: ' + port); 
});