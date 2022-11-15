const axios = require('axios')
const { API_KEY } = process.env
const { Dog, Temperament } = require('../db.js')

const getApiInfo = async () => {
  // TODO: CAMBIAR EL LIMIT DE 20
  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds?limit=20`
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

  const result = dbDogs?.map((d) => {
    return {
      id: d.dataValues.id,
      name: d.dataValues.name,
      height_min: d.dataValues.height_min,
      height_max: d.dataValues.height_max,
      weight_min: d.dataValues.weight_min,
      weight_max: d.dataValues.weight_max,
      life_span_min: d.dataValues.life_span_min,
      life_span_max: d.dataValues.life_span_max,
      temperament: d.dataValues.temperaments
        .map((t) => t.dataValues.name)
        .join(', ')
        .toString(),
    }
  })

  return result
}

const allDogs = async () => {
  const api = await getApiInfo()
  const db = await getDbInfo()

  return db.concat(api)
}

// Get temperaments from allDogs to load them into the database
;(async () => {
  const dogs = await allDogs()
  const setTemperament = new Set()

  dogs
    .map((dog) => dog.temperament)
    .forEach((group) => {
      group?.split(', ').forEach((temp) => {
        setTemperament.add(temp)
      })
    })

  const arrTemperament = Array.from(setTemperament)

  arrTemperament.forEach(async (t) => {
    await Temperament.findOrCreate({
      where: {
        name: t,
      },
    })
  })
})()

module.exports = {
  allDogs,
}
