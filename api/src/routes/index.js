const { Router } = require('express')
const { allDogs } = require('../controllers')

const router = Router()

// Importar todos los routers;
const dogs = require('./dog.routes.js')
const temperaments = require('./temperaments.routes.js')

// TODO: AGREGAR MIDDLEWARE ADECUADO
/* router.use((req, res, next) => {
  console.log('soy un Middleware')
  next()
}) */

router.use('/', dogs)
router.use('/', temperaments)

module.exports = router
