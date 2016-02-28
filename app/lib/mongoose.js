(function() {

	'use strict';

	var mongoose = require('mongoose');
  var config = require('../config/config.js');

	module.exports = function() {
    //Mongo DB connection
    var uri = process.env.MONGOLAB_URI ?
      process.env.MONGOLAB_URI : config().mongodb;

		var db = mongoose.connect(uri);

    db.connection.on('open', function() {
		  console.log('Connected to mongodb');
		});
		db.connection.on('error', function(err) {
		  console.log('Mongoose error ' + err);
		});

		require('../models/userServerModel.js');
		require('../models/linkServerModel.js');
    require('../models/groupServerModel.js');
		return db;
	};

})();
