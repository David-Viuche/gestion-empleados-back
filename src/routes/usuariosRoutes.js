const router = require('express').Router();
const { usuarioNuevo, usuarioPorId } = require('../controllers/usuariosControllers');

router.post('/', usuarioNuevo); //Crear un usuario nuevo
router.get('/:id', usuarioPorId); //buscar un usuario por Id

module.exports = router;