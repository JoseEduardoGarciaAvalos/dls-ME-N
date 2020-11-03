var express = require('express');
var router = express.Router();
var bicicletaController = require("../contollers/bicicleta");

router.get('/', bicicletaController.bicicleta_list);
router.get('/create', bicicletaController.bicicleta_create_get);
router.post('/create', bicicletaController.bicicleta_create_post);
router.post('/delete', bicicletaController.bicicleta_delete_post);
router.get('/:code/update', bicicletaController.bicicleta_update_get);
router.post('/:code/update', bicicletaController.bicicleta_update_post);

module.exports = router;
