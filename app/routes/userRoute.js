'use strict';

var express = require('express');
var	userCtrl = require('../controllers/userController.js');
var router = express.Router();

router.route('/sign_in')
  .post(userCtrl.signIn);

router.route('/sign_up')
  .post(userCtrl.signUp);

router.route('/delete/:id')
  .delete(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

router.route('/update/:id')
  .put(userCtrl.ensureAuthenticated, userCtrl.updateUser);

router.route('/get/:id')
  .get(userCtrl.ensureAuthenticated, userCtrl.getUser);

module.exports = router;
