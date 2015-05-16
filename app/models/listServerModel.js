'use strict';

var mongoose = require('mongoose');

var ListSchema = mongoose.Schema({
  title:  {
    type:String,
    required: 'Título de la lista es requerido'
  },
  description:String

});

