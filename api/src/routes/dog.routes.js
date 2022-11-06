const express = require('express')
const router = express.Router()
const { allDogs } = require('../controllers')

router.use(express.json())

// Get all dogs from API and DB from controller
router.get('/get', async (req, res) => {
  try {
    const dogs = await allDogs()
    res.status(200).json(dogs)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
