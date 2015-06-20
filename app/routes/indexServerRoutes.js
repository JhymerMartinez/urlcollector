(function(){

  'use strict';

  module.exports = function(app){
  	var index = require('../controllers/indexServerController.js');
  	app.get('/#!/',index.render );
  	app.get('/',index.render);
  };

})();
