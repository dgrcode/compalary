const defaultState = {
  rentIndexData: {},
  exchangeRate: { from: {} }
};

const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'DATA_RENT_INDEX':
    return Object.assign({}, state, {
      rentIndexData: action.payload.rentIndexData
    });
    break;

  case 'EXCHANGE_RATE_UPDATE':
    const {
      currencyFrom,
      currencyTo,
      value
    } = action.payload;

    const nextState = { ...state };

    if (!nextState.exchangeRate.from.hasOwnProperty(currencyFrom)) {
      nextState.exchangeRate.from[currencyFrom] = { to: {} };
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
          }
        }
      }
    };

  default:
    return state;
  }
};

export default dataReducer;
