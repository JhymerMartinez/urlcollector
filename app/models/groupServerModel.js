'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;
var MessageService = require('../services/message.js');

var GroupSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: MessageService.users.groupNameRequired
  },
  description: String,
  dateAdded: {
    type: Date,
    default: Date.now
  },
  star: {
    type: Boolean,
    default: false
  },
  links: [{
    type: Schema.ObjectId,
    ref: 'Link'
  }]
});

GroupSchema.post('remove', function(aGroup, next) {
  var self = this;
  _.each(self.links, function(link, index) {
    self.model('Link').findById(link, function(err, alink) {
      if (err) {
        next(err);
      } else {
        alink.remove(function(err) {
          if (err) {
            next(err);
          } else {
            if (index === (self.links.length - 1)) {
              next();
            }
          }
        });
      }
    });
  });
});

module.exports =  mongoose.model('Group',GroupSchema);
