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

function sortAscByWeight(a, b) {
  return a.weight_max > b.weight_max ? 1 : a.weight_max < b.weight_max ? -1 : 0
}

function sortDescByWeight(a, b) {
  return a.weight_max > b.weight_max ? -1 : a.weight_max < b.weight_max ? 1 : 0
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
      let sortedByName

      if (action.payload === 'asc') {
        sortedByName = state.dogs.sort(sortAscByName)
      } else if (action.payload === 'desc') {
        state.dogs.sort(sortDescByName)
      }

      return {
        ...state,
        sortedByName,
      }
    case 'ORDER_BY_WEIGHT':
      let sortedByWeight

      if (action.payload === 'asc') {
        sortedByWeight = state.dogs.sort(sortAscByWeight)
      } else if (action.payload === 'desc') {
        sortedByWeight = state.dogs.sort(sortDescByWeight)
      }

      return {
        ...state,
        sortedByWeight,
      }

    default:
      return { ...state }
  }
}

export default rootReducer
