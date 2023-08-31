const mongoose = require('mongoose')
const Apat = require('./apat')
const Exercici = require('./exercici')



const cartillaSchema = new mongoose.Schema({
    fruita: Number,
    dinar: {
      type: Apat.schema,
      required: true,
    },
    sopar: {
      type: Apat.schema,
      required: true,
    },
    likes: Number,
    date: Date,
    pes: Number,
    exercici: {
      type: Exercici.schema,
      required: false,
    },
    alcohol: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuari'
    },
})

cartillaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Cartilla', cartillaSchema)

