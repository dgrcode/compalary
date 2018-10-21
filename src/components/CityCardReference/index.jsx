import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import './style.sass'
import CitySelector from '../CitySelector'
import CurrencySelector from '../CurrencySelector'
import { referenceSalary } from '../../selectors/referenceSelector'

class CityCardReference extends React.Component {
  constructor (props) {
    super(props)

    this.handleSalaryChanged = this.handleSalaryChanged.bind(this)
    this.handleCitySelected = this.handleCitySelected.bind(this)
    this.handleCurrencySelected = this.handleCurrencySelected.bind(this)
  }
  handleSalaryChanged (evt) {
    this.props.onSalaryChanged(evt.target.value)
  }

  handleCitySelected (cityInfo) {
    if (cityInfo === null) {
      this.props.resetReferenceCity()
      return
    }

    this.props.updateReferenceCity(cityInfo)
  }

  handleCurrencySelected (currency) {
    this.props.updateReferenceCurrency(currency)
  }

  render () {
    return (
      <div className='refInHeader'>
        <CitySelector className='overDark withMargin' handleCitySelected={this.handleCitySelected} />
        <div className='withMargin flex'>
          Salary:
          <input className='marginRight overDark' type='text' value={this.props.referenceSalary} onChange={this.handleSalaryChanged} />
          <CurrencySelector className='overDark' handleCurrencySelected={this.handleCurrencySelected} />
        </div>
      </div>
    )
  }
}

CityCardReference.propTypes = {
  referenceSalary: PropTypes.string.isRequired,
  onSalaryChanged: PropTypes.func.isRequired,
  resetReferenceCity: PropTypes.func.isRequired,
  updateReferenceCity: PropTypes.func.isRequired,
  updateReferenceCurrency: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  referenceSalary: referenceSalary(state)
})

const mapDispatchToProps = dispatch => ({
  onSalaryChanged: nextSalary => dispatch({
    type: 'CHANGE_REFERENCE_SALARY',
    payload: { nextSalary }
  }),

  updateReferenceCity: cityInfo => dispatch({
    type: 'UPDATE_REFERENCE_CITY',
    payload: { cityInfo }
  }),

  updateReferenceCurrency: currency => dispatch({
    type: 'UPDATE_REFERENCE_CURRENCY',
    payload: { currency }
  }),

  resetReferenceCity: () => dispatch({
    type: 'RESET_REFERENCE_CITY'
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(CityCardReference)
