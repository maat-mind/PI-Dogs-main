const express = require('express')
const { Temperament } = require('../db.js')

const temperaments = express.Router()
temperaments.use(express.json())

// Get all possible temperaments
temperaments.get('/temperaments', async (req, res) => {
  try {
    const findTemp = await Temperament.findAll()
    res.status(200).json(findTemp)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = temperaments
