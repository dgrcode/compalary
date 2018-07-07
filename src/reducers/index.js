import cardReducer from './cardReducer';
import computedReducer from './computedReducer';
import dataReducer from './dataReducer';
import referenceReducer from './referenceReducer';

const reducer = (state = {}, action) => ({
  card: cardReducer(state.card, action),
  computed: computedReducer(state.computed, action, state),
  data: dataReducer(state.data, action),
  reference: referenceReducer(state.reference, action)
});

export default reducer;
