const initialState = {
  dogs: [],
  temperaments: [],
  detail: [],
  error: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload,
      }
    case 'POST_DOG':
      return {
        ...state,
      }
    case 'GET_TEMPS':
      return {
        ...state,
        temperaments: action.payload,
      }

    default:
      return { ...state }
  }
}

export default rootReducer
