import uuid from 'uuid/v4'

const defaultState = {
  [uuid()]: {
    currency: 'EUR'
  }
}

const cardReducer = (state = defaultState, action) => {
  let cardId
  switch (action.type) {
    case 'UPDATE_CARD_PROPERTY':
      cardId = action.payload.cardId
      let propertyName = action.payload.propertyName
      let nextValue = action.payload.nextValue
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          [propertyName]: nextValue
        }
      }

    case 'UPDATE_CARD_CITY':
      cardId = action.payload.cardId
      let cityInfo = action.payload.cityInfo
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          cityInfo
        }
      }

    case 'UPDATE_CARD_CURRENCY':
      cardId = action.payload.cardId
      let currency = action.payload.currency
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          currency
        }
      }

    case 'RESET_CITY_INFO':
      cardId = action.payload.cardId
      return {
        ...state,
        [cardId]: {
          currency: state[cardId].currency
        }
      }

    case 'ADD_CITY_CARD':
      return {
        ...state,
        [uuid()]: {
          currency: 'EUR'
        }
      }

    default:
      return state
  }
}

export default cardReducer
