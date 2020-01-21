import cardReducer from './cardReducer'
import comparisonReducer from './comparisonReducer'
import dataReducer from './dataReducer'
import referenceReducer from './referenceReducer'

const reducer = (state = {}, action) => ({
  card: cardReducer(state.card, action),
  comparison: comparisonReducer(state.comparison, action),
  data: dataReducer(state.data, action),
  reference: referenceReducer(state.reference, action)
})

export default reducer
