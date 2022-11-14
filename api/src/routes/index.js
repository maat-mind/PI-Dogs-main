const { Router } = require('express')

const router = Router()

// Importar todos los routers;
const dogs = require('./dog.routes.js')
const temperaments = require('./temperaments.routes.js')

router.use('/', dogs)
router.use('/', temperaments)

module.exports = router
