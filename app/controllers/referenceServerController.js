'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

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


