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
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: [],
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
    case 'GET_BY_NAME':
      return {
        ...state,
        dogs: action.payload,
      }
    case 'FILTER_BY_ORIGIN':
      let created

      if (action.payload === 'db') {
        created = state.dogs.filter((e) => e.user_created)
      } else if (action.payload === 'api') {
        created = state.dogs.filter((e) => !e.user_created)
      }

      return {
        ...state,
        dogs: created,
      }
    case 'FILTER_BY_TEMPERAMENT':
      const filteredByTemp = state.dogs.filter((e) =>
        e.temperament?.includes(action.payload)
      )

      return {
        ...state,
        dogs: filteredByTemp,
      }
    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload,
      }
    default:
      return { ...state }
  }
}

export default rootReducer
