const { validateTokenJWT } = require('../middlewares/jwtMiddleware');
const { Usuarios } = require('../models/index');

function validateToken(req, res, next) {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        const usuario = validateTokenJWT(token);
        if (usuario) {
            if (Date.now() >= usuario.vencimiento) {
                res.status(401).json({ error: 'token vencido' })
            } else {
                req.params.usuario = usuario;
                next();
            }
        } else {
            res.status(401).json({ error: 'token invalido o faltante' })
        }
    } else {
        res.status(401).json({ error: 'token invalido o faltante' })
    }
}

function validateSesionUser(req, res, next) {
    const usuario = req.params.usuario;

    Usuarios.findOne({
        where: {
            id: usuario.id_usuario
        }
    })
        .then(result => {
            if (result.active) {
                next();
            } else {
                res.status(401).json({ error: 'el usuario no tiene sesion iniciada' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

function validateParamsUsuarioNuevo(req, res, next) {

    const { nombre, apellido, correo, contraseña } = req.body;

    if (nombre && apellido && correo && contraseña) {
        next();
    } else {
        res.status(400).json({ error: "Todos los parametros son necesarios" });
    }
}

function validateParamsLogin(req, res, next) {

    const { correo, contraseña } = req.body;

    if (correo && contraseña) {
        next();
    } else {
        res.status(400).json({ error: "Todos los parametros son necesarios" });
    }
}

function validateParamsEmpleado(req, res, next) {
    const { nombre, apellido, tipoIdentificacion, numeroIdentificacion, salario } = req.body;

    if (nombre && apellido && (tipoIdentificacion == 'nit' || tipoIdentificacion == 'cc') && numeroIdentificacion && salario) {
        next();
    } else {
        res.status(400).json({ error: "Todos los parametros son necesarios" });
    }
}

module.exports = {
    validateToken,
    validateSesionUser,
    validateParamsUsuarioNuevo,
    validateParamsLogin,
    validateParamsEmpleado
}