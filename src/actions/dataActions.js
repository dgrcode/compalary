export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES'

export const setExchangeRates = ({ rates, isUpToDate }) => ({
  type: SET_EXCHANGE_RATES,
  payload: {
    rates,
    isUpToDate
  }
})
