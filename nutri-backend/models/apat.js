const mongoose = require('mongoose')

const apatSchema = mongoose.Schema({
    proteines:Number,  
    hidrats:Number,  
    fibra:Boolean,  
    greixos:Boolean,  
    lactics:Boolean,  
    comentaris:String,  
});

module.exports = mongoose.model('Apat', apatSchema)