(function() {

  'use strict';

  var mongoose = require('mongoose');
  var UserModel = mongoose.model('User');
  var LinkModel = mongoose.model('Link');
  var MessageService = require('../services/messages.js');

  exports.saveLink = function(req, res, next) {

    var linkModel = new LinkModel({
      title: req.body.title,
      url: req.body.url,
      dateAdded: new Date(),
      description: req.body.description
    });

    linkModel.save(function(err, aLink) {
      if (err) {
        return res
          .status(500)
          .send({
            message: MessageService.GlobalErrors.serverErrorUnknown
          });
      } else {
        req.link = aLink.id;
        next();
      }
    });
  };

})();
