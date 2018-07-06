const defaultState = {};

const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'DATA_RENT_INDEX':
    return Object.assign({}, state, {
      rentIndexData: action.payload.rentIndexData
    });

  default:
    return state;
  }
};

export default dataReducer;
