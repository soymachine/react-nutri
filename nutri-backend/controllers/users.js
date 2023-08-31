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

module.exports = usersRouter