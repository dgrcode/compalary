const defaultState = {
  card0: {}
};

const cardReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'UPDATE_CARD_PROPERTY':
    let cardId = action.payload.cardId;
    let propertyName = action.payload.propertyName;
    let nextValue = action.payload.nextValue;
    return Object.assign({}, state, {
      [cardId]: Object.assign({}, state[cardId], {
        [propertyName]: nextValue
      })
    });
    break;

  case 'UPDATE_CARD_CITY':
    cardId = action.payload.cardId;
    let cityInfo = action.payload.cityInfo;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        cityInfo
      }
    };

  case 'UPDATE_CARD_CURRENCY':
    cardId = action.payload.cardId;
    let currency = action.payload.currency;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        currency
      }
    };

  case 'RESET_CITY':
    cardId = action.payload.cardId;
    return Object.assign({}, state, {
      [cardId]: {}
    });

  default:
    return state;
  }
};

export default cardReducer;
