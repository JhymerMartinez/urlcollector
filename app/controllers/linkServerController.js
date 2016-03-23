'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var LinkModel = mongoose.model('Link');
var MessageService = require('../services/messages.js');
var _ = require('lodash');

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
      req.link = aLink._id;
      return next();
    }
  });
};

exports.saveArrayLinks = function(req, res, next) {

  var dateAdded = new Date();

  var linksIds = [];
  var errors = [];

  var newLinks = _.each(req.body.links, function(link) {
    link.dateAdded = dateAdded;
  });

  _.each(newLinks, function(link, index) {
    var linkModel = new LinkModel({
      title: link.title,
      url: link.url,
      dateAdded: link.dateAdded,
      description: link.description
    });

    linkModel.save(function(err, aLink) {
      if (err) {
        errors.push(err);
      } else {
        linksIds.push(aLink._id);
      }
      runNextCallback(newLinks.length, index, req, errors, linksIds, next);
    });
  });

};

exports.deleteLink = function(req, res) {

  LinkModel.findById(req.body.id, function(err, alink) {
    if (err) {
      return res
        .status(500)
        .send({
          message: MessageService.GlobalErrors.serverErrorUnknown
        });
    } else {
      alink.remove(function(err) {
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

  });
};

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
