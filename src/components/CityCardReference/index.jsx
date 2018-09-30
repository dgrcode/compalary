import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../res/styles/citycard.sass';
import CitySelector from '../CitySelector';
import CurrencySelector from '../CurrencySelector';

class CityCardReference extends React.Component {
  static propTypes = {
    requestSalariesUpdate: PropTypes.func.isRequired,
    onSalaryChanged: PropTypes.func.isRequired,
    updateReferenceCity: PropTypes.func.isRequired,
    updateReferenceCurrency: PropTypes.func.isRequired,
    resetReferenceCity: PropTypes.func.isRequired,
    resetSalaries: PropTypes.func.isRequired,
    referenceSalary: PropTypes.number.isRequired,
    hasReferenceCity: PropTypes.bool.isRequired
  }

  componentDidUpdate () {
    if (this.props.hasReferenceCity) {
      this.props.requestSalariesUpdate();
    }
  }

  handleSalaryChanged = evt => {
    this.props.onSalaryChanged(evt.target.value);
  }

  handleCitySelected = cityInfo => {
    if (cityInfo === null) {
      this.props.resetReferenceCity();
      this.props.resetSalaries();
      return;
    }

    this.props.updateReferenceCity(cityInfo);
    this.props.requestSalariesUpdate();
  }

  handleCurrencySelected = currency => {
    this.props.updateReferenceCurrency(currency);
    this.props.requestSalariesUpdate();
  }

  render () {
    return (
      <div className="citycard reference">
        <CitySelector handleCitySelected={this.handleCitySelected}/>
        <label>Salary
          <input type="text" value={this.props.referenceSalary} onChange={this.handleSalaryChanged} />
        </label>
        <CurrencySelector handleCurrencySelected={this.handleCurrencySelected} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  referenceSalary: state.reference.salary,
  hasReferenceCity: state.reference.cityInfo !== undefined
});

const mapDispatchToProps = dispatch => ({
  onSalaryChanged: nextSalary => dispatch({
    type: 'CHANGE_REFERENCE_SALARY',
    payload: { nextSalary }
  }),

  requestSalariesUpdate: () => dispatch({
    type: 'REQUEST_SALARIES_UPDATE'
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
  }),

  resetSalaries: () => dispatch({
    type: 'RESET_SALARIES'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCardReference);
