import React from 'react'
import PropTypes from 'prop-types'

const FormulaCell = ({ title, description, formula }) => (
  <div className='formula'>
    <strong>{title}:</strong>
    {description()}
    <pre>
      {formula()}
    </pre>
  </div>
)

FormulaCell.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.func.isRequired,
  formula: PropTypes.func.isRequired
}

export default FormulaCell
