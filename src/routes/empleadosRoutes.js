const router = require('express').Router();
const { Empleados, Telefonos_Empleados } = require('../models/index')
const { todosEmpleados, empleadoId, empleadoNuevo } = require('../controllers/empleadosControllers');

router.get('/', todosEmpleados); //buscar todos los empleados
router.get('/:id', empleadoId); //buscar un empleado por el Id
router.post('/', empleadoNuevo) //crear un nuevo empleado

module.exports = router;