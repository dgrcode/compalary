import React from 'react'
import './style.sass'
import comparisons from '../../utils/salaryComparisons'
import FormulaCell from './FormulaCell'

const FormulaDefinitions = () => (
  <div className='formulaDefinitions'>
    <h3>Definitions</h3>
    <div>
      {Object.entries(comparisons)
        .map(([comparisonKey, { description, formulaNode, title }]) => (
          <FormulaCell
            key={comparisonKey}
            comparisonKey={comparisonKey}
            title={title}
            description={description}
            formulaNode={formulaNode}
          />
        ))
      }
    </div>
  </div>
)

export default FormulaDefinitions
