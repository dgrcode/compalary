const defaultState = {
  citiesData: {},
  exchangeRate: { from: {} }
}

const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CITIES_DATA':
      return Object.assign({}, state, {
        citiesData: action.payload.citiesData
      })

    case 'EXCHANGE_RATE_UPDATE':
      const {
        currencyFrom,
        currencyTo,
        value
      } = action.payload

      const nextState = { ...state }

      if (!nextState.exchangeRate.from.hasOwnProperty(currencyFrom)) {
        nextState.exchangeRate.from[currencyFrom] = { to: {
          [currencyFrom]: 1
        } }
      }

      if (!nextState.exchangeRate.from.hasOwnProperty(currencyTo)) {
        nextState.exchangeRate.from[currencyTo] = { to: {
          [currencyTo]: 1
        } }
      }

      return {
        ...nextState,
        exchangeRate: {
          from: {
            ...nextState.exchangeRate.from,
            [currencyFrom]: {
              to: {
                ...nextState.exchangeRate.from[currencyFrom].to,
                [currencyTo]: value
              }
            },
            [currencyTo]: {
              to: {
                ...nextState.exchangeRate.from[currencyTo].to,
                [currencyFrom]: 1 / value
              }
            }
          }
        }
      }

    default:
      return state
  }
}

export default dataReducer
