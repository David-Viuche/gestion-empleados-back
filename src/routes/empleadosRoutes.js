const router = require('express').Router();
const { todosEmpleados, empleadoId, empleadoNuevo, actualizarEmpleado, borrarEmpleado } = require('../controllers/empleadosControllers');

router.get('/', todosEmpleados); //buscar todos los empleados
router.get('/:id', empleadoId); //buscar un empleado por el Id
router.post('/', empleadoNuevo) //crear un nuevo empleado
router.put('/:id', actualizarEmpleado) //Actualizar empleado por Id
router.delete('/:id', borrarEmpleado) // Eliminar empleado por Id

module.exports = router;