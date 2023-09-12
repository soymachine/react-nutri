const mongoose = require('mongoose')

const apatSchema = mongoose.Schema({
    proteines:Number,  
    hidrats:Number,  
    fibra:Number,  
    greixos:Number,  
    lactics:Number,  
});

module.exports = mongoose.model('Apat', apatSchema)