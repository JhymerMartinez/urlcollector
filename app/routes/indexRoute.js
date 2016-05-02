'use strict';

var express = require('express');
var indexCtrl = require('../controllers/indexController.js');
var router = express.Router();

router.route('/')
  .get(indexCtrl.message);

module.exports = router;
