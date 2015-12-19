(function() {

  'use strict';

  var mongoose = require('mongoose');
  var UserModel = mongoose.model('User');
  var LinkModel = mongoose.model('Link');

  exports.myFunction1 = function(req, res) {

      UserModel.findOne({
          _id: req.user
          },function(err, user) {
              if (!user) {
                  console.log(err);
              } else {
                  res.json(user);
              }
          });
  };

  exports.saveLink = function(req, res) {

    var linkModel = new LinkModel({
      title: req.body.title,
      url: req.body.url,
      dateAdded: req.body.dateAdded,
      description: req.body.description
    });

    linkModel.save(function(err, aLink) {
      if (err) {
          console.log(err);
      } else {
          return res
              .status(200)
              .send(aLink);
      }
    });
  };

})();
