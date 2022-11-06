const { Dog, Temperament } = require('../db.js')
const axios = require('axios')

const getApiInfo = async () => {
  const response = await axios.get('https://api.thedogapi.com/v1/breeds')
  const apiDogs = response.data.map(async (d) => {
    return {
      name: d.name,
      height: d.height,
      weight: d.weight,
      life_span: d.life_span,
      temperament: d.temperament,
    }
  })

  console.log(apiDogs)
  return apiDogs
}

getApiInfo()

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

// TODO unir ambas funciones

module.exports = {
  getDbInfo,
}
