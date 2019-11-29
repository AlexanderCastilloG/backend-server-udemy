// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// case sensitive ->distingue mayúsculas y minúsculas

// Inicializar variables
var app = express();


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


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

// Importar Rutas
var appRoutes = require('./routes/app');
var usuariosRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});

// Escuchar peticiones
app.use('/usuario', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);