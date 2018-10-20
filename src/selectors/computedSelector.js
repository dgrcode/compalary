const sfRentIdx = 106.49

const computeGitlabSalary = (refSalary, refRentIdx, rentIdx, sfRentIdx) =>
  Math.round(refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))

export const equivalentSalary = (state, cardId) => {
  const referenceData = state.reference
  if (!referenceData.cityInfo || !referenceData.currency) return {}

  const refSalary = referenceData.salary
  if (!refSalary) return {}

  const cardState = state.card[cardId]
  if (!cardState.cityInfo || !cardState.currency) return {}

  const exchangeRate = state.data.exchangeRate.from[referenceData.currency].to[cardState.currency]
  const refRentIdx = referenceData.cityInfo.rentIdx
  const rentIdx = cardState.cityInfo.rentIdx

  return {
    gitlab: Math.round(computeGitlabSalary(refSalary, refRentIdx, rentIdx, sfRentIdx) * exchangeRate)
  }
}
