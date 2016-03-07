'use strict';
var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/indexServerController.js');

router.route('/')
  .get(indexCtrl.message);

module.exports = router;
