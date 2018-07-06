import dataReducer from './dataReducer';

const reducer = (state, action) => ({
  data: dataReducer(state, action)
});

export default reducer;
