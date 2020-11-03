var express = require('express');
var router = express.Router();
var usuarioController = require('../../contollers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);

module.exports = router;
