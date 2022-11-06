const { Router } = require('express')
const { allDogs } = require('../controllers')

const router = Router()

// Importar todos los routers;
const dogs = require('./dog.routes.js')

// TODO: AGREGAR MIDDLEWARE ADECUADO
/* router.use((req, res, next) => {
  console.log('soy un Middleware')
  next()
}) */

router.use('/', dogs)

module.exports = router
