const mongoose = require('mongoose')
const Apat = require('./apat')

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
    esmorzar: {
      type: Apat.schema,
      required: true,
    },
    berenar: {
      type: Apat.schema,
      required: true,
    },
    migMati: {
      type: Apat.schema,
      required: true,
    },
    likes: Number,
    date: Date,
    pes: Number,
    forca: {
      type: Boolean,
      required: false,
    },
    cardio: {
      type: Boolean,
      required: false,
    },
    alcohol: Number,
    dolcos: Number,
    verdura: Number,
    refrescos: Number,
    extresSalats: Number,
    xocolata: Number,
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

