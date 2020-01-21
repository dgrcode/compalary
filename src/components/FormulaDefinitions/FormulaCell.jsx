import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { comparisonToggleVisible } from '../../actions/comparisonActions'

const FormulaCell = ({
  comparisonKey,
  title,
  description,
  formulaNode,
  toggleVisible,
  visible
}) => {
  const visibleSet = new Set(visible)
  return (
    <div className='formula'>
      <label>
        <input
          type='checkbox'
          checked={visibleSet.has(comparisonKey)}
          onChange={() => toggleVisible(comparisonKey)}
        /> <strong>{title}</strong>
      </label>
      {description()}
      <pre>
        {formulaNode()}
      </pre>
    </div>
  )
}

FormulaCell.propTypes = {
  comparisonKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.func.isRequired,
  formulaNode: PropTypes.func.isRequired,
  toggleVisible: PropTypes.func.isRequired,
  visible: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = state => ({
  visible: state.comparison.visible
})

const mapDispatchToProps = dispatch => ({
  toggleVisible: comparisonKey => dispatch(comparisonToggleVisible(comparisonKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormulaCell)
