const { Usuarios } = require('../models/index');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/configServer');
const { generateTokenJWT } = require('../middlewares/jwtMiddleware');

const usuarioNuevo = async (req, res) => {

    const { nombre, apellido, correo, contraseña } = req.body;

    const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

    Usuarios.create({
        nombre,
        apellido,
        correo,
        contraseña: contraseñaEncriptada
    }
    )
        .then(result => {
            res.status(201).json({
                msg: "Usuario creado correctamente",
                usuario: {
                    id: result.id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

const usuarioPorId = (req, res) => {
    const idUsuario = req.params.usuario.id_usuario;
    Usuarios.findOne(
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'contraseña']
            },
            where: {
                id: idUsuario
            }
        }
    )
        .then(result => {
            if (result.length != 0) {
                res.json(result);
            } else {
                res.status(404).json({
                    error: 'Usuario no encontrado'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

const loginUsuarios = (req, res) => {
    const { correo, contraseña } = req.body;

    Usuarios.findOne({
        where: {
            correo
        }
    })
        .then(async result => {
            if (result) {
                const contraseñaValida = await bcrypt.compare(contraseña, result.contraseña);
                if (contraseñaValida) {
                    Usuarios.update({
                        active: 1
                    }, {
                        where: {
                            id: result.id
                        }
                    }).then(result2 => {
                        const token = generateTokenJWT(
                            {
                                id_usuario: result.id,
                                creacion: Date.now(),
                                vencimiento: Date.now() + 1800000
                            }
                        );
                        res.status(201).json({
                            msg: 'sesion iniciada correctamente',
                            data: {
                                token
                            }
                        });
                    })
                } else {
                    res.status(401).json({
                        msg: 'contraseña incorrecta'
                    });
                }
            } else {
                res.status(401).json({
                    msg: 'correo incorrecto'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

const logoutUsuarios = (req, res) => {
    const userId = req.params.usuario.id_usuario;

    Usuarios.findOne({
        where: {
            id: userId
        }
    })
        .then(result => {
            if (result) {
                Usuarios.update({
                    active: 0
                }, {
                    where: {
                        id: result.id
                    }
                }).then(result2 => {
                    res.json({
                        msg: 'sesion cerrada correctamente'
                    });
                })
            } else {
                res.status(404).json({
                    msg: 'usuario incorrecto'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}


module.exports = {
    usuarioNuevo,
    usuarioPorId,
    loginUsuarios,
    logoutUsuarios
}