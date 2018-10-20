import cardReducer from './cardReducer';
import dataReducer from './dataReducer';
import referenceReducer from './referenceReducer';

const reducer = (state = {}, action) => ({
  card: cardReducer(state.card, action),
  data: dataReducer(state.data, action),
  reference: referenceReducer(state.reference, action)
});

export default reducer;
