const defaultState = {
  salary: ''
};

const referenceReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'CHANGE_REFERENCE_SALARY':
    const nextSalary = Number.parseFloat(action.payload.nextSalary);

    return Object.assign({}, state, {
      salary: isNaN(nextSalary) ? '' : nextSalary
    });
    break;

  case 'UPDATE_REFERENCE_CITY':
    return Object.assign({}, state, {
      cityInfo: action.payload.cityInfo
    });
    break;

  default:
    return state;
  }
};

export default referenceReducer;
