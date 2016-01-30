(function() {

  'use strict';

  var mongoose = require('mongoose');
  var _ = require('lodash');
  var UserModel = mongoose.model('User');
  var GroupModel = mongoose.model('Group');
  var MessageService = require('../services/messages.js');

  exports.saveGroup = function(req, res) {
    var newGroupModel = new GroupModel({
      groupName: req.body.group.groupName,
      description: req.body.group.description
    });

    GroupModel.findOne({
        user: req.user,
        groupName: req.body.group.groupName
      },
      function onSuccess(err, groupFromDB) {
        if (!groupFromDB) {
          //Add user id
          newGroupModel.user = req.user;
          newGroupModel.links.push(req.link);
          saveData(res, newGroupModel);

        } else {
          groupFromDB.links.push(req.link);
          saveData(res, groupFromDB);
        }
      });

  };

  exports.saveAllGroup = function(req, res) {

    var newGroupModel = new GroupModel({
      groupName: req.body.groupName,
      description: req.body.description
    });

    GroupModel.findOne({
        user: req.user,
        groupName: req.body.groupName
      },
      function onSuccess(err, groupFromDB) {
        if (!groupFromDB) {
          //Add user id
          newGroupModel.user = req.user;
          newGroupModel.links = req.linksIds;
          saveData(res, newGroupModel);
        }
        //} else {
          //saveData(res, groupFromDB);
        //}
      });

  };

  exports.getGroupLinks = function(req, res) {

    GroupModel
      .find({user: req.param('userId')})
      .populate('links')
      .exec(function onSucess(err, groups) {
        if (err) {
          return res
            .status(500)
            .send({
              message: MessageService.GlobalErrors.serverErrorUnknown
            });
        } else {
          return res
            .status(200)
            .send({
              data: groups
            });
        }
      });

  };

  function saveData(res, group) {
    group.save(function onSuccess(err, aGroup) {
      if (err) {
        return res
          .status(500)
          .send({
            message: MessageService.GlobalErrors.serverErrorUnknown
          });
      } else {
        return res
          .status(200)
          .send({
            message: 'Success'
          });
      }
    });
  }

})();
