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
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});

// Server index config - solo para comprobar que las imagenes estan públicas
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'));
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// Escuchar peticiones
app.use('/usuario', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);