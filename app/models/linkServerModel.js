(function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var MessageService = require('../services/messages.js');

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

  module.exports =  mongoose.model('Link',LinkSchema);

})();
