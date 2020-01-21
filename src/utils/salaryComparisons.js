import React from 'react'
import FormulaCell from '../components/FormulaDefinitions/FormulaCell'
import Var from '../components/FormulaDefinitions/Var'

const sfRentIdx = 106.49

const computeCostOfLivingSalary = (refSalary, refCostOfLivingIdx, costOfLivingIdx) =>
  Math.round(refSalary * costOfLivingIdx / refCostOfLivingIdx)

const computeCostOfLivingPlusRentSalary = (refSalary, refCostOfLivingPlusRentIdx, costOfLivingPlusRentIdx) =>
  Math.round(refSalary * costOfLivingPlusRentIdx / refCostOfLivingPlusRentIdx)

const computeGroceriesSalary = (refSalary, refGroceriesIdx, groceriesIdx) =>
  Math.round(refSalary * groceriesIdx / refGroceriesIdx)

const computeGitlabSalary = (refSalary, refRentIdx, rentIdx, sfRentIdx) =>
  Math.round(
    refSalary * (0.7 * rentIdx / sfRentIdx + 0.3) / (0.7 * refRentIdx / sfRentIdx + 0.3))

const comparisons = {
  costOfLiving: {
    title: '💰Cost of living',
    description: () => <p>If salary was proportional to the cost of living</p>,
    formulaNode: () => (
      <React.Fragment>
        <Var>costOfLiving</Var> / <Var>referenceCostOfLiving</Var>
      </React.Fragment>
    ),
    computation:
      ({ refSalary, refCostOfLivingIdx, costOfLivingIdx, exchangeRate }) =>
        Math.round(computeCostOfLivingSalary(refSalary, refCostOfLivingIdx, costOfLivingIdx) * exchangeRate).toLocaleString()
  },
  costOfLivingPlusRent: {
    title: '🏠Cost of living with rent',
    description: () => <p>If salary was proportional to the cost of living including rent</p>,
    formulaNode: () => (
      <React.Fragment>
        <Var>costOfLivingPlusRent</Var> / <Var>referenceCostOfLivingPlusRent</Var>
      </React.Fragment>
    ),
    computation:
      ({ refSalary, refCostOfLivingPlusRentIdx, costOfLivingPlusRentIdx, exchangeRate }) =>
        Math.round(computeCostOfLivingPlusRentSalary(refSalary, refCostOfLivingPlusRentIdx, costOfLivingPlusRentIdx) * exchangeRate).toLocaleString()
  },
  groceries: {
    title: '🛒Groceries',
    description: () => <p>Salary that would allow to buy same amount of groceries in both cities</p>,
    formulaNode: () => (
      <React.Fragment>
        <Var>groceriesIndex</Var> / <Var>referenceGroceriesIndex</Var>
      </React.Fragment>
    ),
    computation:
      ({ refSalary, refGroceriesIdx, groceriesIdx, exchangeRate }) =>
        Math.round(computeGroceriesSalary(refSalary, refGroceriesIdx, groceriesIdx) * exchangeRate).toLocaleString()
  },
  gitlab: {
    title: '🚀Gitlab',
    description: () => <p>Equivalent salary to the reference salary using <a target='_blank' href='https://about.gitlab.com/2018/03/23/gitlabs-global-compensation-calculator-the-next-iteration/'>gitlab's formula</a></p>,
    formulaNode: () => (
      <React.Fragment>
      0.7 * (<Var>rentIndex</Var> / <Var>sfRendIndex</Var> + 0.3) / (<Var>referenceRentIndex</Var> / <Var>sfRendIndex</Var> + 0.3)
      </React.Fragment>
    ),
    computation: ({ refSalary, refRentIdx, rentIdx, exchangeRate }) =>
      Math.round(computeGitlabSalary(refSalary, refRentIdx, rentIdx, sfRentIdx) * exchangeRate).toLocaleString() }
}

export default comparisons
