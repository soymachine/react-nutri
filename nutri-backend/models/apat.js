const mongoose = require('mongoose')

const apatSchema = mongoose.Schema({
    proteines:Number,  
    hidrats:Number,  
    fibra:Number,  
});

module.exports = mongoose.model('Apat', apatSchema)