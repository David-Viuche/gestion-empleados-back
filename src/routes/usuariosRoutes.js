const router = require('express').Router();
const { usuarioNuevo } = require('../controllers/usuariosControllers');

router.post('/', usuarioNuevo); //buscar usuario por Id

module.exports = router;