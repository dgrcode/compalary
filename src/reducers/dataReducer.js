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
      nextState.exchangeRate.from[currencyFrom] = { to: {
        [currencyFrom]: 1
      } };
    }

    if (!nextState.exchangeRate.from.hasOwnProperty(currencyTo)) {
      nextState.exchangeRate.from[currencyTo] = { to: {
        [currencyTo]: 1
      } };
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
    };

  default:
    return state;
  }
};

export default dataReducer;
