const defaultState = {
  salary: 0,
  currency: 'EUR'
}

const referenceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_REFERENCE_SALARY':
      const nextSalary = Number.parseFloat(action.payload.nextSalary)

      return {
        ...state,
        salary: isNaN(nextSalary) ? 0 : nextSalary
      }

    case 'UPDATE_REFERENCE_CITY':
      return {
        ...state,
        cityInfo: action.payload.cityInfo
      }

    case 'UPDATE_REFERENCE_CURRENCY':
      return {
        ...state,
        currency: action.payload.currency
      }

    case 'RESET_REFERENCE_CITY':
      const nextState = { ...state }
      delete nextState.cityInfo
      return nextState

    default:
      return state
  }
}

export default referenceReducer
