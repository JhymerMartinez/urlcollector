'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageService = require('../services/message.js');

var LinkSchema = mongoose.Schema({
  title:  {
    type: String,
    required: MessageService.users.linkTitleRequired
  },
  url:  {
    type: String,
    required: MessageService.users.linkUrlRequired
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  description: String
});

LinkSchema.post('remove', function(aLink, next) {

  var self = this;

  //Remove ObjectId from 'links' in Group model
  self.model('Group').update({
    links: self._id
  },
  {
    '$pull': {
      links: self._id
    }
  },
  function onSucess(err, result) {
    if (result.ok > 0) {
      next(err);
    }
  });

});

module.exports =  mongoose.model('Link',LinkSchema);
