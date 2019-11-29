var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/**
 * Verificar Token
 */

exports.verificaToken = function(req, res, next) {

    const token = req.query.token;

    //example localhost:3000/usuario?token=coloca-tu-token
    //decoded => es el usuario decodificado
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
        // res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
};