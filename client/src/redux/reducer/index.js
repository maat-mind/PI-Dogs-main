const initialState = {
  dogs: [],
  temperaments: [],
  detail: [],
  error: [],
}

function sortAscByName(a, b) {
  return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
}

function sortDescByName(a, b) {
  return a.name > b.name ? -1 : a.name < b.name ? 1 : 0
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
    case 'ORDER_BY_NAME':
      const sortedArray =
        action.payload === 'asc'
          ? state.dogs.sort(sortAscByName)
          : state.dogs.sort(sortDescByName)
      return {
        ...state,
        sortedArray,
      }

    default:
      return { ...state }
  }
}

export default rootReducer
