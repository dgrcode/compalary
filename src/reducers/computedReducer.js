const defaultState = {
  card0: {}
};

const sfRentIdx = 106.49;
const computedReducer = (state = defaultState, action, fullState) => {
  switch (action.type) {
  case 'REQUEST_SALARIES_UPDATE':
    let referenceData = fullState.reference;
    let refSalary = referenceData.salary;
    let refRentIdx = referenceData.cityInfo.rentIdx;

    const nextState = Object.assign({}, state);

    for (let cardId in state) {
      const cardState = fullState.card[cardId];
      if (!cardState.cityInfo) {
        continue;
      }
      const rentIdx = cardState.cityInfo.rentIdx;

      nextState[cardId] = {
        gitlab: Math.round(refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))
      };
    }

    return nextState;
    break;

  case 'REQUEST_CARD_SALARY_UPDATE':
    const cardId = action.payload.cardId;
    referenceData = fullState.reference;
    refSalary = referenceData.salary;
    refRentIdx = referenceData.cityInfo.rentIdx;

    const cardState = fullState.card[cardId];
    const rentIdx = cardState.cityInfo.rentIdx;

    return Object.assign({}, state, {
      [cardId]: {
        gitlab: Math.round(refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))
      }
    });
    break;

  default:
    return state;
  }
};

export default computedReducer;