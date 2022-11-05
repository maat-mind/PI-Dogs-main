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
  try {
    const dogs = await getDbInfo()
    res.sendStatus(200).json(dogs)
  } catch (error) {
    res.sendStatus(500).json({ error: error.message })
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router
