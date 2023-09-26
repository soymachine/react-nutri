const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Usuari = require('../models/usuari')

const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  const { username, nom, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new Usuari({
    username,
    nom,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await Usuari.find({}).populate('cartilles')
    response.json(users)
})

// Actualiza los objetivos de una persona
usersRouter.put('/', async (request, response, next) => {
  const { username } = request.body
  const user = await Usuari.findOne({ username })

  console.log(`params id:${request.params.id}`)
  const proteinesObject = {
    carn_vermella: {
        id: "carn_vermella",
        vegades: 2,
        grams: 160
    },
    carn_blanca: {
      id: "carn_blanca",
      vegades: 2,
      grams: 200
    },
    peix_blau: {
      id: "peix_blau",
      vegades: 2,
      grams: 200
    },
    peix_blanc: {
      id: "peix_blanc",
      vegades: 2,
      grams: 240
    },
    ous: {
      id: "ous",
      vegades: 3,
      grams: 2
    },
    llegums: {
      id: "llegums",
      vegades: 2,
      grams: 80
    },

  }
  const updatedUser = {
    username:user.username,
    nom:user.nom,
    passwordHash:user.passwordHash,
    cartilles:user.cartilles,
    camps:user.camps,
    maxims:user.maxims,
    proteines: proteinesObject
  }

  const updatedUserResponsed = await Usuari.findByIdAndUpdate({_id:user._id}, updatedUser, {new:true});
  console.log(updatedUserResponsed)
  //response.json(objectiveUpdated)
  response.json({})
  /*
  //console.log(cartilla)
  */
})

module.exports = usersRouter