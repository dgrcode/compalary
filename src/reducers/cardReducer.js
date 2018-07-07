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
    return Object.assign({}, state, {
      [cardId]: { cityInfo }
    });
    break;

  default:
    return state;
  }
};

export default cardReducer;
