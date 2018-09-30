const defaultState = {
  card0: {}
};

const resetSalaries = {
  gitlab: 0
};

const sfRentIdx = 106.49;
const computedReducer = (state = defaultState, action, fullState) => {
  let nextState;
  let cardId;

  switch (action.type) {
  case 'REQUEST_SALARIES_UPDATE':
    let referenceData = fullState.reference;
    if (!referenceData.cityInfo || !referenceData.currency) return state;

    let refSalary = referenceData.salary;
    let refRentIdx = referenceData.cityInfo.rentIdx;

    nextState = { ...state };

    for (let cardId in state) {
      const cardState = fullState.card[cardId];
      if (!cardState.cityInfo || !cardState.currency) continue;

      const rentIdx = cardState.cityInfo.rentIdx;

      nextState[cardId] = {
        gitlab: Math.round(refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))
      };
    }
    return nextState;

  case 'RESET_SALARIES':
    nextState = { ...state };

    for (let cardId in state) {
      const cardState = fullState.card[cardId];
      if (!cardState.cityInfo) {
        continue;
      }

      nextState[cardId] = resetSalaries;
    }
    return nextState;

  case 'RESET_CITY':
    cardId = action.payload.cardId;
    nextState = { ...state };
    nextState[cardId] = resetSalaries;
    return nextState;

  case 'REQUEST_CARD_SALARY_UPDATE':
    cardId = action.payload.cardId;
    referenceData = fullState.reference;

    if (!referenceData.cityInfo || !referenceData.currency) return state;
    refSalary = referenceData.salary;
    refRentIdx = referenceData.cityInfo.rentIdx;

    const cardState = fullState.card[cardId];
    if (!cardState.cityInfo || !cardState.currency) return state;

    const rentIdx = cardState.cityInfo.rentIdx;

    return {
      ...state,
      [cardId]: {
        gitlab: Math.round(refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))
      }
    };

  default:
    return state;
  }
};

export default computedReducer;
