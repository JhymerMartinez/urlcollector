(function(){

  'use strict';

  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  var Reference = mongoose.model('Reference');

  exports.myFunction1 = function(req,res){

      User.findOne({
          _id:req.user
          },function(err, user) {
              if(!user){
                  console.log(err);
              }else{
                  res.json(user);
              }
          });
  };

  exports.saveReference = function(req ,res){

    var reference = new Reference({
      title : req.body.title,
      url : req.body.url,
      date_added  : req.body.date_added,
      description : req.body.description
    });

    reference.save(function(err,reference){
      if(err){
          console.log(err);
      }else{
          return res
              .status(200)
              .send(reference);
      }
    });
  };

})();

