import axios from 'axios'

const URL = 'http://localhost:3001'

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const dogs = await axios.get(`${URL}/dogs`)

      return dispatch({
        type: 'GET_DOGS',
        payload: dogs.data,
      })
    } catch (error) {
      return dispatch({
        type: 'ERROR',
        payload: {
          message: error.message,
        },
      })
    }
  }
}

export const postDog = (payload) => {
  return async (dispatch) => {
    try {
      let newDog = await axios.post(`${URL}/dogs`, payload)
      return dispatch({
        type: 'POST_DOG',
        payload: newDog,
      })
    } catch (error) {
      return dispatch({
        type: 'ERROR',
        payload: {
          message: error.message,
        },
      })
    }
  }
}

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      let temperaments = await axios.get(`${URL}/temperaments`)

      return dispatch({
        type: 'GET_TEMPS',
        payload: temperaments.data,
      })
    } catch (error) {
      return dispatch({
        type: 'ERROR',
        payload: {
          message: error.message,
        },
      })
    }
  }
}

export const orderByName = (payload) => {
  return {
    type: 'ORDER_BY_NAME',
    payload,
  }
}
