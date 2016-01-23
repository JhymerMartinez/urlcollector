(function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var MessageService = require('../services/messages.js');

  var GroupSchema = mongoose.Schema({
    groupName:  {
      type: String,
      required: MessageService.Models.groupNameRequired
    },
    description: String,
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    links: [{
      type: Schema.ObjectId,
      ref: 'Link'
    }]

  });

  module.exports =  mongoose.model('Group',GroupSchema);

})();
