const { Empleados, Telefonos_Empleados } = require('../models/index');

const todosEmpleados = (req, res) => {
    Empleados.findAll(
        {
            include: [{
                model: Telefonos_Empleados,
                as: 'telefonos',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id', 'empleado_id']
                },
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

const empleadoId = (req, res) => {
    const idEmpleado = req.params.id;
    Empleados.findAll(
        {
            include: [{
                model: Telefonos_Empleados,
                as: 'telefonos',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id', 'empleado_id']
                },
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id: idEmpleado
            }
        }
    )
        .then(result => {
            if (result.length != 0) {
                res.json(result);
            } else {
                res.status(404).json({
                    error: 'Empleado no encontrado'
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

const empleadoNuevo = (req, res) => {

    const { nombre, apellido, tipoIdentificacion, numeroIdentificacion, correo, fechaIngreso, salario, telefonos } = req.body;

    Empleados.create({
        nombre,
        apellido,
        tipoIdentificacion,
        numeroIdentificacion,
        correo,
        fechaIngreso,
        salario,
        telefonos
    },
        {
            include: [
                {
                    model: Telefonos_Empleados,
                    as: "telefonos"
                }],
        }
    )
        .then(result => {
            res.status(201).json({
                msg: "Empleado creado correctamente",
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

const actualizarEmpleado = (req, res) => {

    const idEmpleado = req.params.id;
    const { nombre, apellido, tipoIdentificacion, numeroIdentificacion, correo, fechaIngreso, salario, telefonos } = req.body;

    Empleados.update({
        nombre,
        apellido,
        tipoIdentificacion,
        numeroIdentificacion,
        correo,
        fechaIngreso,
        salario
    },
        {
            where: {
                id: idEmpleado
            }
        }
    )
        .then(result => {
            if (telefonos) {
                Telefonos_Empleados.destroy(
                    {
                        where: {
                            empleado_id: idEmpleado
                        }
                    }
                )
                    .then(result2 => {
                        telefonos.forEach(async tel => {
                            try {
                                const result3 = await Telefonos_Empleados.create(
                                    {
                                        telefono: tel.telefono,
                                        empleado_id: idEmpleado
                                    })
                            } catch (err) {
                                console.log(err);
                                res.status(500).json({
                                    error: 'Error interno del servidor, intente más tarde'
                                });
                            }
                        });
                        res.json({
                            msg: "Empleado actualizado correctamente",
                            empleado: {
                                id: idEmpleado
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'Error interno del servidor, intente más tarde'
                        });
                    });
            } else {
                res.json({
                    msg: "Empleado actualizado correctamente",
                    empleado: {
                        id: idEmpleado
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error interno del servidor, intente más tarde'
            });
        });
}

const borrarEmpleado = (req, res) => {

    const idEmpleado = req.params.id;

    Empleados.destroy(
        {
            where: {
                id: idEmpleado
            }
        }
    )
        .then(result => {
            if (result != 0) {
                Telefonos_Empleados.destroy(
                    {
                        where: {
                            empleado_id: idEmpleado
                        }
                    }
                ).then(
                    result2 => {
                        res.json({
                            msg: "Empleado borrado correctamente"
                        })
                    })
            } else {
                res.status(404).json({
                    error: 'Empleado no encontrado'
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
    todosEmpleados,
    empleadoId,
    empleadoNuevo,
    actualizarEmpleado,
    borrarEmpleado
}