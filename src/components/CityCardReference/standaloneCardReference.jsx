import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import '../../res/styles/citycard.sass'
import CitySelector from '../CitySelector'
import CurrencySelector from '../CurrencySelector'

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
      <div className='citycard reference'>
        <div className='flex'>
          <CitySelector className='growWidth marginRight' handleCitySelected={this.handleCitySelected} />
          <CurrencySelector handleCurrencySelected={this.handleCurrencySelected} />
        </div>
        <div className='withMargin'>
          Salary:
          <input type='text' value={this.props.referenceSalary} onChange={this.handleSalaryChanged} />
        </div>
      </div>
    )
  }
}

CityCardReference.propTypes = {
  onSalaryChanged: PropTypes.func.isRequired,
  updateReferenceCity: PropTypes.func.isRequired,
  updateReferenceCurrency: PropTypes.func.isRequired,
  resetReferenceCity: PropTypes.func.isRequired,
  referenceSalary: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  referenceSalary: state.reference.salary
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
