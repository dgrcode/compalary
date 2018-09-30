const defaultState = {};

const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'DATA_RENT_INDEX':
    return Object.assign({}, state, {
      rentIndexData: action.payload.rentIndexData
    });
    break;

  case 'EXCHANGE_RATE_EUR_USD':
    return {
      ...state,
      exchangeRateEurUsd: action.payload.value
    };

  default:
    return state;
  }
};

export default dataReducer;
