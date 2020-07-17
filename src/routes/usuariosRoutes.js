const router = require('express').Router();
const { usuarioNuevo, usuarioPorId, loginUsuarios, logoutUsuarios } = require('../controllers/usuariosControllers');

const { validateToken, validateSesionUser, validateParamsUsuarioNuevo, validateParamsLogin } = require('../middlewares/middlewares');

router.post('/', validateParamsUsuarioNuevo, usuarioNuevo); //Crear un usuario nuevo
router.get('/', [validateToken, validateSesionUser], usuarioPorId); //buscar un usuario por Id
router.post('/login', validateParamsLogin, loginUsuarios); //iniciar sesion usuario
router.post('/logout', [validateToken, validateSesionUser], logoutUsuarios) //cerrar sesion usuario

module.exports = router;