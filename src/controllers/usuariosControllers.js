const { Usuarios } = require('../models/index');

const usuarioNuevo = (req, res) => {

    const { nombre, apellido, correo, contraseña } = req.body;

    Usuarios.create({
        nombre,
        apellido,
        correo,
        contraseña
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
    const idUsuario = req.params.id;
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
        .then(result => {
            if (result) {
                if (result.contraseña == contraseña) {
                    Usuarios.update({
                        active: 1
                    }, {
                        where: {
                            id: result.id
                        }
                    }).then(result2 => {
                        res.status(201).json({
                            msg: 'sesion iniciada correctamente'
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
    const userId = req.params.id;

    Usuarios.findOne({
        where: {
            id:userId
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