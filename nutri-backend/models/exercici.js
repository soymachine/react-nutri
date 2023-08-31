const mongoose = require('mongoose')

const exerciciSchema = mongoose.Schema({
    fet: Boolean,  
    tipus: {
      type: String,
      enum: ['correr', 'força'],
    },
  });

module.exports = mongoose.model('Exercici', exerciciSchema)