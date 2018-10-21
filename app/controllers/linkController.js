var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var LinkModel = mongoose.model('Link');
var GroupModel = mongoose.model('Group');
var MessageService = require('../services/messageService.js');
var _ = require('lodash');
var exports = {
  saveLink: saveLink,
  updateLink: updateLink,
  saveArrayLinks: saveArrayLinks,
  deleteLink: deleteLink
};

function saveLink(req, res, next) {
  var body = req.body;
  var linkModel = new LinkModel({
    title: body.title,
    url: body.url,
    dateAdded: new Date(),
    description: body.description
  });

  if (!_.isEmpty(body.group_id)) { // jshint ignore:line
    findGroup(body.group_id, linkModel); // jshint ignore:line
  } else {
    addToDefaultGroup(linkModel);
  }

  function findGroup(groupId, linkModel) {
    GroupModel.findById(groupId, function successFindById(error, aGroup) {
      if (error) {
        return res
          .status(500)
          .send({
            message: MessageService.global.serverErrorUnknown
          });
      } else {
        addLinkToGroup(aGroup, linkModel);
      }
    });
  }

  function addLinkToGroup(aGroup, linkModel) {
    if (_.isEmpty(aGroup)) {
      addToDefaultGroup(linkModel);
    } else {
      addToSpecificGroup(aGroup, linkModel);
    }
  }

  linkModel.save(function (err, aLink) {
    if (err) {
      return res
        .status(500)
        .send({
          message: MessageService.global.serverErrorUnknown
        });
    } else {
      req.link = aLink._id;
      return next();
    }
  });
}

function addToDefaultGroup() {

}

function addToSpecificGroup() {

}

function saveArrayLinks(req, res, next) {

  var dateAdded = new Date();

  var linksIds = [];
  var errors = [];

  var newLinks = _.each(req.body.links, function (link) {
    link.dateAdded = dateAdded;
  });

  _.each(newLinks, function (link, index) {
    var linkModel = new LinkModel({
      title: link.title,
      url: link.url,
      dateAdded: link.dateAdded,
      description: link.description
    });

    linkModel.save(function (err, aLink) {
      if (err) {
        errors.push(err);
      } else {
        linksIds.push(aLink._id);
      }
      runNextCallback(newLinks.length, index, req, errors, linksIds, next);
    });
  });

}

function updateLink() {

}

function deleteLink(req, res) {

  LinkModel.findById(req.body.id, function (err, alink) {
    if (err) {
      return res
        .status(500)
        .send({
          message: MessageService.global.serverErrorUnknown
        });
    } else {
      alink.remove(function (err) {
        if (err) {
          return res
            .status(500)
            .send({
              message: MessageService.global.serverErrorUnknown
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

  });
}

function runNextCallback(arrayLength, index, req, errors, ids, callback) {
  if ((arrayLength - 1) === index) {
    if (errors.length > 0) {
      req.errors = errors;
      return callback();
    } else {
      req.linksIds = ids;
      return callback();
    }
  }
}

module.exports = exports;
