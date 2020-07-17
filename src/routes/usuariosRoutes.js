const router = require('express').Router();
const { usuarioNuevo, usuarioPorId, loginUsuarios, logoutUsuarios } = require('../controllers/usuariosControllers');

router.post('/', usuarioNuevo); //Crear un usuario nuevo
router.get('/:id', usuarioPorId); //buscar un usuario por Id
router.post('/login', loginUsuarios); //iniciar sesion usuario
router.post('/logout/:id', logoutUsuarios) //cerrar sesion usuario

module.exports = router;