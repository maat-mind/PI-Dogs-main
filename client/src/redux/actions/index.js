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
