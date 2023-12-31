const jwt = require('jsonwebtoken')
const nutriRouter = require('express').Router()
const Cartilla = require('../models/cartilla')
const Apat = require('../models/apat')
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
    greixos:body.esmorzar.greixos,  
    lactics:body.esmorzar.lactics,  
    comentaris:body.esmorzar.comentaris,  
  }

  const migMati = {
    proteines:body.migMati.proteines,  
    hidrats:body.migMati.hidrats,  
    fibra:body.migMati.fibra,  
    greixos:body.migMati.greixos,  
    lactics:body.migMati.lactics,  
    comentaris:body.migMati.comentaris,  
  }

  const berenar = {
    proteines:body.berenar.proteines,  
    hidrats:body.berenar.hidrats,  
    fibra:body.berenar.fibra,  
    greixos:body.berenar.greixos,  
    lactics:body.berenar.lactics,  
    comentaris:body.berenar.comentaris,  
  }

  const dinar = {
    proteines:body.dinar.proteines,  
    hidrats:body.dinar.hidrats,  
    fibra:body.dinar.fibra,  
    greixos:body.dinar.greixos,  
    lactics:body.dinar.lactics,  
    comentaris:body.dinar.comentaris,  
  }

  const sopar = {
    proteines:body.sopar.proteines,  
    hidrats:body.sopar.hidrats,  
    fibra:body.sopar.fibra,  
    greixos:body.sopar.greixos,  
    lactics:body.sopar.lactics,  
    comentaris:body.sopar.comentaris,  
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
    forca:body.forca,
    cardio:body.cardio,
    alcohol: body.alcohol,
    xocolata: body.xocolata,
    extresSalats: body.extresSalats,
    dolcos: body.dolcos,
    refrescos: body.refrescos,
    verdura: body.verdura,
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
      greixos:body.dinar.greixos,  
      lactics:body.dinar.lactics,  
      comentaris:body.dinar.comentaris,  
    })

    const sopar = new Apat({
      proteines:body.sopar.proteines,  
      hidrats:body.sopar.hidrats,  
      fibra:body.sopar.fibra,  
      greixos:body.sopar.greixos,  
      lactics:body.sopar.lactics,  
      comentaris:body.sopar.comentaris,  
    })

    const esmorzar = new Apat({
      proteines:body.esmorzar.proteines,  
      hidrats:body.esmorzar.hidrats,  
      fibra:body.esmorzar.fibra,  
      greixos:body.esmorzar.greixos,  
      lactics:body.esmorzar.lactics,  
      comentaris:body.esmorzar.comentaris,  
    })

    const migMati = new Apat({
      proteines:body.migMati.proteines,  
      hidrats:body.migMati.hidrats,  
      fibra:body.migMati.fibra,  
      greixos:body.migMati.greixos,  
      lactics:body.migMati.lactics,  
      comentaris:body.migMati.comentaris,  
    })

    const berenar = new Apat({
      proteines:body.berenar.proteines,  
      hidrats:body.berenar.hidrats,  
      fibra:body.berenar.fibra,  
      greixos:body.berenar.greixos,  
      lactics:body.berenar.lactics,  
      comentaris:body.berenar.comentaris,  
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
      xocolata: body.xocolata,
      extresSalats: body.extresSalats,
      refrescos: body.refrescos,
      verdura: body.verdura,
      dolcos: body.dolcos,
      forca:body.forca,
      cardio:body.cardio,
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
    
    // console.log(cartilles)
    response.json(cartilles)
})

nutriRouter.get('/month', async (request, response) => {
  // Devolver todas las cartillas del usuario id y del mes + año que venga por params
  // Qué día es hoy?
  let year = request.query.year
  let month = zeroPad(request.query.month, 2)
  let dayStart = zeroPad(1, 2)
  let dayEnd = 31
  // const cartilles = [] // De testeo

  // inicio del mes
  let start = new Date(`${year}-${month}-${dayStart}T00:00:00.000Z`)
  // final del mes
  let end = new Date(`${year}-${month}-${dayEnd}T23:59:00.000Z`)


  let user_id = request.query.user_id
  console.log(`year:${year} month: ${month} start:${start} end:${end} user_id:${user_id}`)
  //*
  const cartilles = await Cartilla.find({
      user:user_id, 
      date:{$gte: start, $lt: end}
      }).populate('user', { username: 1, nom: 1 })
  
  console.log(cartilles)
  //*/
  
  response.json(cartilles)
})

nutriRouter.get('/year', async (request, response) => {
  // Devolver todas las cartillas del usuario id y del mes + año que venga por params
  // Qué día es hoy?
  let year = request.query.year
  let monthStart = zeroPad(1, 2)
  let monthEnd = 12
  let dayStart = zeroPad(1, 2)
  let dayEnd = 31
  

  // inicio del mes
  let start = new Date(`${year}-${monthStart}-${dayStart}T00:00:00.000Z`)
  // final del mes
  let end = new Date(`${year}-${monthEnd}-${dayEnd}T23:59:00.000Z`)


  let user_id = request.query.user_id
  console.log(`year:${year} monthStart: ${monthStart} monthEnd:${monthEnd} start:${start} end:${end} user_id:${user_id}`)
  //*
  const cartilles = await Cartilla.find({
      user:user_id, 
      date:{$gte: start, $lt: end}
      }).populate('user', { username: 1, nom: 1 }).sort("date")
  
  console.log(cartilles)
  //*/
  //const cartilles = [] // De testeo
  response.json(cartilles)
})


nutriRouter.get('/:id', async (request, response) => {
    // Devolver todas las cartillas del usuario id
    let id = request.params.id
   
    const cartilla = await Cartilla.find({user:id})
    response.json(cartilla)
    
})

nutriRouter.get('/date/:dateID', async (request, response) => {
    // Devolver todas las cartillas del usuario id
    let id = request.params.dateID
    let user_id = request.query.user_id
    let today = new Date(id)
    console.log(typeof(today))
    let day = zeroPad(today.getDate(), 2)
    let month = zeroPad(today.getUTCMonth() +1, 2) 
    let year = today.getFullYear()


    // inicio del dia de hoy
    let start = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
    // final del dia de hoy
    let end = new Date(`${year}-${month}-${day}T23:59:00.000Z`)

    console.log(`get data for a start:${start} and end:${end}`)
  
    const cartilles = await Cartilla.find({
      user:user_id, 
      date:{$gte: start, $lt: end}
      }).populate('user', { username: 1, nom: 1 })
  
    console.log(cartilles)
    response.json(cartilles)
  
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
    //console.log(cartilla)
    console.log(`params id:${request.params.id}`)
    const cartillaUpdated = await Cartilla.findByIdAndUpdate({_id:request.params.id}, cartilla, {new:true});
    console.log(cartillaUpdated)
    response.json(cartillaUpdated)
    //response.json({})
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