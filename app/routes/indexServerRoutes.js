'use strict';

var express = require('express');
var indexCtrl = require('../controllers/indexServerController.js');
var router = express.Router();

router.route('/')
  .get(indexCtrl.message);

module.exports = router;
