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

    default:
      return { ...state }
  }
}

export default rootReducer
