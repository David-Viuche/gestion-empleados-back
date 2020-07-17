const router = require('express').Router();
const { todosEmpleados, empleadoId, empleadoNuevo, actualizarEmpleado, borrarEmpleado } = require('../controllers/empleadosControllers');
const { validateToken, validateSesionUser, validateParamsEmpleado } = require('../middlewares/middlewares');

router.get('/', [validateToken, validateSesionUser], todosEmpleados); //buscar todos los empleados
router.get('/:id', [validateToken, validateSesionUser], empleadoId); //buscar un empleado por el Id
router.post('/', [validateToken, validateSesionUser, validateParamsEmpleado], empleadoNuevo) //crear un nuevo empleado
router.put('/:id', [validateToken, validateSesionUser, validateParamsEmpleado], actualizarEmpleado) //Actualizar empleado por Id
router.delete('/:id', [validateToken, validateSesionUser], borrarEmpleado) // Eliminar empleado por Id

module.exports = router;