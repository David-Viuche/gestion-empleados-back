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

module.exports = {
    usuarioNuevo,
    usuarioPorId
}