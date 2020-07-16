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
                empleado: {
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

module.exports = {
    usuarioNuevo
}