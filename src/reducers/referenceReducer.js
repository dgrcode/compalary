const defaultState = {
  salary: 0
};

const referenceReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'CHANGE_REFERENCE_SALARY':
    const nextSalary = Number.parseFloat(action.payload.nextSalary);

    return Object.assign({}, state, {
      salary: isNaN(nextSalary) ? 0 : nextSalary
    });
    break;

  case 'UPDATE_REFERENCE_CITY':
    return Object.assign({}, state, {
      cityInfo: action.payload.cityInfo
    });
    break;

  case 'RESET_REFERENCE_CITY':
    const nextState = { ...state };
    delete nextState.cityInfo;
    return nextState;

  default:
    return state;
  }
};

export default referenceReducer;
