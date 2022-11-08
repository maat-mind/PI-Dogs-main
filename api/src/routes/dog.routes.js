const express = require('express')
const { allDogs } = require('../controllers')
const { Dog, Temperament } = require('../db.js')

const dogs = express.Router()
dogs.use(express.json())

// Get all dogs or query dog by name from API and DB from controller
dogs.get('/dogs', async (req, res) => {
  try {
    const { name } = req.query
    const dogs = await allDogs()

    if (name) {
      const findDog = dogs.filter((dog) => dog.name === name)

      return findDog.length
        ? res.status(200).json(findDog)
        : res.status(404).json({ message: `${name} not found` })
    }

    res.status(200).json(dogs)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Post a new dog into the app
dogs.post('/dogs', async (req, res) => {
  try {
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span_min,
      life_span_max,
      temperament,
      image,
    } = req.body

    if (
      !name ||
      !height_min ||
      !height_max ||
      !weight_min ||
      !weight_max ||
      !life_span_min ||
      !life_span_max ||
      !temperament ||
      !image
    ) {
      return res.status(500).json({ message: 'cannot be null' })
    }

    const [newDog, created] = await Dog.findOrCreate({
      where: {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        image,
      },
    })

    // TODO: traer todos los dogs y quedarse con el temperament, luego forEach
    temperament.map(async (t) => {
      const findTemp = await Temperament.findAll({
        where: { name: t },
      })
      createDog.addTemperament(findTemp)
    })

    res.status(200).json(newDog)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = dogs
