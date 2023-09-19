const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const usuariSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  camps:Array, 
  maxims:Array, 
  nom:String,
  passwordHash: String,
  cartilles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cartilla'
    }
  ], 
});

usuariSchema.plugin(uniqueValidator)


usuariSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Usuari', usuariSchema)