import React from 'react'
import './style.sass'
import comparisons from '../../utils/salaryComparisons'

const FormulaDefinitions = () => (
  <div className='formulaDefinitions'>
    <h3>Definitions</h3>
    <div>
      {Object.keys(comparisons)
        .map(comparisonKey => comparisons[comparisonKey].formula)
      }
    </div>
  </div>
)

export default FormulaDefinitions
