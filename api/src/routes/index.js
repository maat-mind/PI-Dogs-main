const { Router } = require('express')
const { allDogs } = require('../controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router()

// TODO: AGREGAR MIDDLEWARE ADECUADO
/* router.use((req, res, next) => {
  console.log('soy un Middleware')
  next()
}) */

router.use('/dogs', async (req, res) => {
  const dogs = await allDogs()
  res.status(200).json(dogs)
})

// router.use('/', dogs)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router
