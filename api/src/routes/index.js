const { Router } = require('express')
const { getDbInfo } = require('../controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router()

// TODO: AGREGAR MIDDLEWARE ADECUADO
/* router.use((req, res, next) => {
  console.log('soy un Middleware')
  next()
}) */

router.use('/dogs', async (req, res) => {
  const dogs = await getDbInfo()
  res.status(200).json(dogs)
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router
