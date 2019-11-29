var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();

var Usuario = require('../models/usuario');

/**
 * 
 */
app.post('/', (req, res, next) => {

    const { email, password } = req.body;

    Usuario.findOne({ email: email }).then(usuarioDB => {

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: {
                    message: 'Credenciales incorrectas - email',
                }
            });
        }

        if (!bcrypt.compareSync(password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: {
                    message: 'Credenciales incorrectas - password'
                }
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        const token = jwt.sign({ usuario: usuarioDB }, SEED, {
            expiresIn: 14400 // 4horas
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Login post correcto',
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    }).catch(err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
    });

});

module.exports = app;