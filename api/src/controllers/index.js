const axios = require('axios')
const { API_KEY } = process.env
const { Dog, Temperament } = require('../db.js')

const getApiInfo = async () => {
  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds?${API_KEY}`
  )
  const apiDogs = await response.data.map(async (d) => {
    return {
      id: d.id,
      name: d.name,
      height_min: parseInt(d.height.metric),
      height_max: parseInt(d.height.metric.slice(4)),
      weight_min: parseInt(d.weight.metric),
      weight_max: parseInt(d.weight.metric.slice(4)),
      life_span_min: parseInt(d.life_span),
      life_span_max: parseInt(d.life_span.slice(4)),
      temperament: d.temperament,
    }
  })

  const dogs = await Promise.all(apiDogs)
  return dogs
}

const getDbInfo = async () => {
  const dbDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  })

  return dbDogs
}

const allDogs = async () => {
  const api = await getApiInfo()
  const db = await getDbInfo()

  return db.concat(api)
}

const getTemperaments = async () => {
  const dogs = await allDogs()
  const setTemperament = new Set()

  dogs
    .map((dog) => dog.temperament)
    .forEach((group) => {
      group?.split(', ').forEach((temp) => {
        setTemperament.add(temp)
      })
    })

  const arrTemperament = Array.from(setTemperament).sort()

  return arrTemperament
}

const loadTemperaments = async () => {
  const allTemperaments = await getTemperaments()

  allTemperaments.forEach(async (t) => {
    await Temperament.findOrCreate({
      where: {
        name: t,
      },
    })
  })
}

loadTemperaments()

module.exports = {
  allDogs,
  getTemperaments,
}
