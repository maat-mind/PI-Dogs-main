const express = require('express')
const { allDogs } = require('../controllers')
const { Dog, Temperament } = require('../db.js')

const dogs = express.Router()
dogs.use(express.json())

// check if post has null key || existing name
async function checkPost(req, res, next) {
  for (const key in req.body) {
    if (!req.body[key])
      return res.status(500).json({ message: `${key} cannot be null` })
  }

  const dogs = await allDogs()

  return dogs.find((dog) => dog.name === req.body.name)
    ? res.status(500).json({ message: 'name already exists' })
    : next()
}

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

// Get a dog by id
dogs.get('/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params

    const dogs = await allDogs()
    if (!id) res.status(404).json(`Couldn't find dog with id: ${id}`)

    const dog = dogs.find((d) => d.id.toString() === id)
    res.status(200).json(dog)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Post a new dog into the app
dogs.post('/dogs', checkPost, async (req, res) => {
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
      user_created,
    } = req.body

    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span_min,
      life_span_max,
      image,
      user_created,
    })

    temperament.map(async (t) => {
      const findTemp = await Temperament.findAll({
        where: { name: t },
      })

      newDog.addTemperament(findTemp)
    })

    res.status(200).json(newDog)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = dogs
