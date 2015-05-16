'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReferenceSchema = mongoose.Schema({
  title:  {
    type:String,
    required: 'Título del enlace es requerido'
  },
  url:  {
    type:String,
    required: 'Dirección de enlace es requerida'
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  description:String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  list: {
    type: Schema.ObjectId,
    ref: 'List'
  }


});
