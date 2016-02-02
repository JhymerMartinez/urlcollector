(function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var MessageService = require('../services/messages.js');
  var Group = require('./groupServerModel.js');

  var LinkSchema = mongoose.Schema({
    title:  {
      type: String,
      required: MessageService.Models.linkTitleRequired
    },
    url:  {
      type: String,
      required: MessageService.Models.linkUrlRequired
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    description: String
  });

  LinkSchema.post('remove', function(aLink, next) {

    //Remove ObjectId from 'links' in Group model
    Group.update({
      links: this._id
    }, {
      '$pull': {
        links: this._id
      }
    }, function onSucess(err, result) {
      if (result.ok > 0) {
        next();
      }
    });

  });

  module.exports =  mongoose.model('Link',LinkSchema);

})();
