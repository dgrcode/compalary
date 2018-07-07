import computedReducer from './computedReducer';
import dataReducer from './dataReducer';

const reducer = (state, action) => ({
  computed: computedReducer(state, action),
  data: dataReducer(state, action)
});

export default reducer;
