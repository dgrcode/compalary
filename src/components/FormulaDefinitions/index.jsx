import React from 'react'
import './style.sass'
import FormulaCell from './FormulaCell'
import Var from './Var'

const FormulaDefinitions = () => (
  <div className='formulaDefinitions'>
    <h3>Definitions</h3>
    <div>
      <FormulaCell
        title='Cost of living'
        description={() => <p>If salary was proportional to the cost of living</p>}
        formula={() => <React.Fragment><Var>costOfLiving</Var> / <Var>referenceCostOfLiving</Var></React.Fragment>}
      />
      <FormulaCell
        title='Cost of living with rent'
        description={() => <p>If salary was proportional to the cost of living including rent</p>}
        formula={() => <React.Fragment><Var>costOfLivingPlusRent</Var> / <Var>referenceCostOfLivingPlusRent</Var></React.Fragment>}
      />
      <FormulaCell
        title='Groceries'
        description={() => <p>Salary that would allow to buy same amount of groceries in both cities</p>}
        formula={() => <React.Fragment>
          <Var>groceriesIndex</Var> / <Var>referenceGroceriesIndex</Var>
        </React.Fragment>}
      />
      <FormulaCell
        title='Gitlab'
        description={() => <p>Equivalent salary to the reference salary using <a target='_blank' href='https://about.gitlab.com/2018/03/23/gitlabs-global-compensation-calculator-the-next-iteration/'>gitlab's formula</a></p>}
        formula={() => <React.Fragment>0.7 * (<Var>rentIndex</Var> / <Var>sfRendIndex</Var> + 0.3) / (<Var>referenceRentIndex</Var> / <Var>sfRendIndex</Var> + 0.3)</React.Fragment>}
      />
    </div>
  </div>
)

export default FormulaDefinitions
