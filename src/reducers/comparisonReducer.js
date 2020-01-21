import { produce } from 'immer'
import { COMPARISON_TOGGLE_VISIBLE } from '../actions/comparisonActions'

const defaultState = {
  visible: ['costOfLivingPlusRent', 'groceries', 'gitlab']
}

const cardReducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case COMPARISON_TOGGLE_VISIBLE: {
        const comparisonKey = action.payload.key
        const visibleSet = new Set(state.visible)
        draft.visible = Array.from(
          // returns true if it was visible and could delete
          visibleSet.delete(comparisonKey)
            // if it was deleted we're good
            ? visibleSet
            // if it wasn't deleted it means it wasn't visible before
            // in that case we want to add it
            : visibleSet.add(comparisonKey)
        )
        break
      }
    }
  })

export default cardReducer
