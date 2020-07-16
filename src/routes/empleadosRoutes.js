const router = require('express').Router();
// const { empleados } = require('../controllers/empleadosControllers');
const { Empleados, Telefonos_Empleados } = require('../models/index')

router.get('/', (req, res) => {
    Empleados.findAll(
        {
            include: [{
                model: Telefonos_Empleados,
                as:'telefonos',
                attributes: { 
                    exclude: ['createdAt', 'updatedAt','id','empleado_id'] 
                },
            }],
            attributes: { 
                exclude: ['createdAt', 'updatedAt'] 
            },
        }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;