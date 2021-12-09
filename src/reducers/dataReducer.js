import { produce } from 'immer'
import { SET_EXCHANGE_RATES } from '../actions/dataActions'

const defaultState = {
  citiesData: {},
  exchangeRates: {},
  areExchangeRatesUpToDate: undefined,
}

const dataReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'CITIES_DATA':
        draft.citiesData = action.payload.citiesData
        break

      case SET_EXCHANGE_RATES:
        draft.exchangeRates = action.payload.rates
        draft.areExchangeRatesUpToDate = action.payload.isUpToDate
        break
    }
  })

export default dataReducer
