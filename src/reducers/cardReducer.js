import { produce } from 'immer'
import uuid from 'uuid/v4'

const defaultState = {
  [uuid()]: {
    currency: 'EUR'
  }
}

const cardReducer = (state = defaultState, action) =>
  produce(state, draft => {
    let cardId
    switch (action.type) {
      case 'UPDATE_CARD_PROPERTY':
        cardId = action.payload.cardId
        let propertyName = action.payload.propertyName
        let nextValue = action.payload.nextValue
        draft[cardId][propertyName] = nextValue
        break

      case 'UPDATE_CARD_CITY':
        cardId = action.payload.cardId
        let cityInfo = action.payload.cityInfo
        draft[cardId].cityInfo = cityInfo
        break

      case 'UPDATE_CARD_CURRENCY':
        cardId = action.payload.cardId
        let currency = action.payload.currency
        draft[cardId].currency = currency
        break

      case 'RESET_CITY_INFO':
        cardId = action.payload.cardId
        draft[cardId] = {
          currency: state[cardId].currency
        }
        break

      case 'ADD_CITY_CARD':
        draft[uuid()] = {
          currency: 'EUR'
        }
        break

      case 'REMOVE_CITY_CARD':
        cardId = action.payload.cardId
        delete draft[cardId]
        break
    }
  })

export default cardReducer
