const jwt = require('jsonwebtoken')
const objectivesRouter = require('express').Router()
const Objective = require('../models/objective')
const Usuari = require('../models/usuari')
const logger = require('../utils/logger')


// Token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Construye el objeto simple de Objective para enviar a la base de datos
const constructObjectiveObj = (body, user) =>{
  const objective = {
    user_id: body.user_id,
    verdura: body.verdura,
    fruita: body.fruita,
    xocolata: body.xocolata,
    dolcos: body.dolcos,
    extresSalats: body.extresSalats,
    alcohol: body.alcohol,
    cardio:body.cardio,
    forca:body.forca,
    refrescos: body.refrescos,
    pes: body.pes,
    user: user.id
  }

  return objective
} 

// Construye la clase de Objective para enviar a la base de datos
const constructObjectiveClass = (body, user) =>{
    
    const objective = new Objective({
      user_id: body.user_id,
      verdura: body.verdura,
      fruita: body.fruita,
      xocolata: body.xocolata,
      dolcos: body.dolcos,
      extresSalats: body.extresSalats,
      alcohol: body.alcohol,
      cardio:body.cardio,
      forca:body.forca,
      refrescos: body.refrescos,
      pes: body.pes,
      user: user.id
    })

    return objective
} 

/**
 * 
 * OBJECTIVE
 * 
 **/
objectivesRouter.get('/', async (request, response) => {
  // Devolver todOs las OBJECTIVES del usuario id
  let user_id = request.query.user_id
  
  const objective = await Objective.find({user:user_id}).populate('user', { username: 1, nom: 1 })
  
  response.json(objective)
})


// Actualiza los objetivos de una persona
objectivesRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await Usuari.findById(decodedToken.id)
    const objective = constructObjectiveObj(body, user)    
    //console.log(cartilla)
    console.log(`params id:${request.params.id}`)
    const objectiveUpdated = await Objective.findByIdAndUpdate({_id:request.params.id}, objective, {new:true});
    //console.log(cartillaUpdated)
    response.json(objectiveUpdated)
    //response.json({})
    /*
    //console.log(cartilla)
    */
})

objectivesRouter.post('/', async (request, response) => {
    console.log("POST DE /")
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    const user = await Usuari.findById(decodedToken.id)
    
    const objective = constructObjectiveClass(body, user)    
    const savedObjective = await objective.save()
    response.json(savedObjective)
})

objectivesRouter.delete('/:id', (request, response, next) => {
  // TODO
})

module.exports = objectivesRouter