const mongoose = require('mongoose')

const objectiveSchema = new mongoose.Schema({
    verdura: Number,
    fruita: Number,
    xocolata: Number,
    dolcos: Number,
    extresSalats: Number,
    alcohol: Number,
    cardio: Number,
    forca: Number,
    refrescos: Number,
    pes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuari'
    },
})

objectiveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Objective', objectiveSchema)

