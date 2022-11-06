const express = require('express')
const { allDogs } = require('../controllers')

const dogs = express.Router()
dogs.use(express.json())

// Get all dogs from API and DB from controller
dogs.get('/dogs', async (req, res) => {
  try {
    const dogs = await allDogs()
    res.status(200).json(dogs)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = dogs
