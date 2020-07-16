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
            where:{
                id: idEmpleado
            }
        }
    )
        .then(result => {
            if(result.length != 0){
                res.json(result);
            }else{
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
    empleadoId
}