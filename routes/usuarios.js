var express = require('express');
var router = express.Router();
var usuarioController = require('../contollers/usuario');

router.get('/', usuarioController.list);
router.get('/create', usuarioController.create_get);
router.post('/create', usuarioController.create);
router.post('/delete/:id', usuarioController.delete);
router.get('/update/:id', usuarioController.update_get);
router.post('/update/:id', usuarioController.update);

module.exports = router;
