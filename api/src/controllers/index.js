const { Dog, Temperament } = require('../db.js')

const getDbInfo = async () => {
  const dogsInDb = await Dog.findAll()

  return dogsInDb
}

module.exports = {
  getDbInfo,
}
