const sfRentIdx = 106.49

const computeCostOfLivingSalary = (refSalary, refCostOfLivingIdx, costOfLivingIdx) =>
  Math.round(refSalary * costOfLivingIdx / refCostOfLivingIdx)

const computeCostOfLivingPlusRentSalary = (refSalary, refCostOfLivingPlusRentIdx, costOfLivingPlusRentIdx) =>
  Math.round(refSalary * costOfLivingPlusRentIdx / refCostOfLivingPlusRentIdx)

const computeGroceriesSalary = (refSalary, refGroceriesIdx, groceriesIdx) =>
  Math.round(refSalary * groceriesIdx / refGroceriesIdx)

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

  const refRentIdx = referenceData.cityInfo.indices.rent
  const refCostOfLivingIdx = referenceData.cityInfo.indices.costOfLiving
  const refCostOfLivingPlusRentIdx = referenceData.cityInfo.indices.costOfLivingPlusRent
  const refGroceriesIdx = referenceData.cityInfo.indices.groceries

  const rentIdx = cardState.cityInfo.indices.rent
  const costOfLivingIdx = cardState.cityInfo.indices.costOfLiving
  const costOfLivingPlusRentIdx = cardState.cityInfo.indices.costOfLivingPlusRent
  const groceriesIdx = cardState.cityInfo.indices.groceries

  return {
    costOfLiving: Math.round(computeCostOfLivingSalary(refSalary, refCostOfLivingIdx, costOfLivingIdx) * exchangeRate).toLocaleString(),
    costOfLivingPlusRent: Math.round(computeCostOfLivingPlusRentSalary(refSalary, refCostOfLivingPlusRentIdx, costOfLivingPlusRentIdx) * exchangeRate).toLocaleString(),
    groceries: Math.round(computeGroceriesSalary(refSalary, refGroceriesIdx, groceriesIdx) * exchangeRate).toLocaleString(),
    gitlab: Math.round(computeGitlabSalary(refSalary, refRentIdx, rentIdx, sfRentIdx) * exchangeRate).toLocaleString()
  }
}
