// Requires
var express = require('express');
var mongoose = require('mongoose');

// case sensitive ->distingue mayúsculas y minúsculas

// Inicializar variables
var app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/hospitalDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    })
    .catch(error => {
        console.log(error);
        if (err) throw err;
    });

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});