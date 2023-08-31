const jwt = require('jsonwebtoken')
const nutriRouter = require('express').Router()
const Cartilla = require('../models/cartilla')
const Apat = require('../models/apat')
const Exercici = require('../models/exercici')

const Usuari = require('../models/usuari')
const logger = require('../utils/logger')


const zeroPad = (num, places) => String(num).padStart(places, '0')

// Token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Construye el objeto simple de Cartilla para enviar a la base de datos
const constructCartillaObj = (body, user) =>{
  const esmorzar = {
    proteines:body.esmorzar.proteines,  
    hidrats:body.esmorzar.hidrats,  
    fibra:body.esmorzar.fibra,  
  }

  const migMati = {
    proteines:body.migMati.proteines,  
    hidrats:body.migMati.hidrats,  
    fibra:body.migMati.fibra,  
  }

  const berenar = {
    proteines:body.berenar.proteines,  
    hidrats:body.berenar.hidrats,  
    fibra:body.berenar.fibra,  
  }

  const dinar = {
    proteines:body.dinar.proteines,  
    hidrats:body.dinar.hidrats,  
    fibra:body.dinar.fibra,  
  }

  const sopar = {
    proteines:body.sopar.proteines,  
    hidrats:body.sopar.hidrats,  
    fibra:body.sopar.fibra,  
  }

  const exercici = {
    fet: body.exercici.fet,  
    tipus: body.exercici.tipus,
  }

  const cartilla = {
    user_id: body.user_id,
    fruita: body.fruita,
    dinar: dinar,
    sopar: sopar,
    esmorzar: esmorzar,
    migMati: migMati,
    berenar: berenar,
    date: body.date,
    pes: body.pes,
    exercici:exercici,
    alcohol: body.alcohol,
    user: user.id
  }

  return cartilla
} 

// Construye la clase de Cartilla para enviar a la base de datos
const constructCartillaClass = (body, user) =>{
    const dinar = new Apat({
      proteines:body.dinar.proteines,  
      hidrats:body.dinar.hidrats,  
      fibra:body.dinar.fibra,  
    })

    const sopar = new Apat({
      proteines:body.sopar.proteines,  
      hidrats:body.sopar.hidrats,  
      fibra:body.sopar.fibra,  
    })

    const esmorzar = new Apat({
      proteines:body.esmorzar.proteines,  
      hidrats:body.esmorzar.hidrats,  
      fibra:body.esmorzar.fibra,  
    })

    const migMati = new Apat({
      proteines:body.migMati.proteines,  
      hidrats:body.migMati.hidrats,  
      fibra:body.migMati.fibra,  
    })

    const berenar = new Apat({
      proteines:body.berenar.proteines,  
      hidrats:body.berenar.hidrats,  
      fibra:body.berenar.fibra,  
    })

    

    const exercici = new Exercici({
      fet: body.exercici.fet,  
      tipus: body.exercici.tipus,
    })

    const cartilla = new Cartilla({
      user_id: body.user_id,
      fruita: body.fruita,
      dinar: dinar,
      sopar: sopar,
      esmorzar: esmorzar,
      migMati: migMati,
      berenar: berenar,      
      date: body.date,
      pes: body.pes,
      exercici:exercici,
      alcohol: body.alcohol,
      user: user.id
    })

    return cartilla
} 

/**
 * 
 * CARTILLES
 * 
 **/
nutriRouter.get('/', async (request, response) => {
  // Devolver todas las cartillas del usuario id
  let user_id = request.query.user_id
  
  const cartilles = await Cartilla.find({user:user_id}).populate('user', { username: 1, nom: 1 })
  
  response.json(cartilles)
})

nutriRouter.get('/today', async (request, response) => {
    // Devolver todas las cartillas del usuario id y del dia de hoy
    // Qué día es hoy?
 
    let today = new Date()
    let day = zeroPad(today.getDate(), 2)
    let month = zeroPad(today.getUTCMonth() +1, 2) 
    let year = today.getFullYear()


    // inicio del dia de hoy
    let start = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
    // final del dia de hoy
    let end = new Date(`${year}-${month}-${day}T23:59:00.000Z`)


    let user_id = request.query.user_id
 
    const cartilles = await Cartilla.find({
        user:user_id, 
        date:{$gte: start, $lt: end}
        }).populate('user', { username: 1, nom: 1 })
    
    response.json(cartilles)
})


nutriRouter.get('/:id', async (request, response) => {
    // Devolver todas las cartillas del usuario id
    let id = request.params.id
   
    const cartilla = await Cartilla.find({user:id})
    response.json(cartilla)
    
})

// Actualiza la cartilla de una persona
nutriRouter.put('/:id', async (request, response, next) => {
    

    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await Usuari.findById(decodedToken.id)
    const cartilla = constructCartillaObj(body, user)    
    console.log(cartilla)
    const cartillaUpdated = await Cartilla.findByIdAndUpdate({_id:request.params.id}, cartilla, {new:true});
    console.log(cartillaUpdated)
    response.json(cartillaUpdated)
    /*
    //console.log(cartilla)
    */
})

nutriRouter.post('/', async (request, response) => {
    console.log("POST DE /")
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    const user = await Usuari.findById(decodedToken.id)
    
    const cartilla = constructCartillaClass(body, user)    


    const savedCartilla = await cartilla.save()
    user.cartilles = user.cartilles.concat(savedCartilla._id)
    await user.save()

    response.json(savedCartilla)
})


nutriRouter.delete('/:id', (request, response, next) => {
  Cartilla.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = nutriRouter