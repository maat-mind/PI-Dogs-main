const axios = require('axios')
const { API_KEY } = process.env
const { Dog, Temperament } = require('../db.js')

const getApiInfo = async () => {
  const response = await axios.get(
    `https://api.thedogapi.com/v1/breeds?${API_KEY}`
  )
  const apiDogs = response.data.map(async (d) => {
    return {
      name: d.name,
      height: d.height.metric,
      weight: d.weight.metric,
      life_span: d.life_span,
      temperament: d.temperament,
    }
  })

  return apiDogs
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

module.exports = {
  allDogs,
}
