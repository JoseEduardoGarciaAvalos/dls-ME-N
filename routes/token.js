var express = require('express');
var router = express.Router();
var tokenController = require('../contollers/token');

router.get('/confirmation/:token', tokenController.confirmationGet);

module.exports = router;
