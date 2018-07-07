import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CitySelector from '../CitySelector';

class CityCardReference extends React.Component {
  static propTypes = {
    requestSalariesUpdate: PropTypes.func.isRequired,
    onSalaryChanged: PropTypes.func.isRequired,
    updateCitySelected: PropTypes.func.isRequired,
    referenceSalary: PropTypes.number
  }

  constructor (props) {
    super(props);
  }

  componentDidUpdate () {
    this.props.requestSalariesUpdate();
  }

  handleSalaryChanged = evt => {
    this.props.onSalaryChanged(evt.target.value);
  }

  handleCitySelected = cityInfo => {
    this.props.updateCitySelected(cityInfo);
    this.props.requestSalariesUpdate();
  }

  render () {
    return (
      <div>
        <CitySelector handleCitySelected={this.handleCitySelected}/>
        <label>Salary
          <input type="text" value={this.props.referenceSalary} onChange={this.handleSalaryChanged} />
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  referenceSalary: state.reference.salary
});

const mapDispatchToProps = dispatch => ({
  onSalaryChanged: nextSalary => dispatch({
    type: 'CHANGE_REFERENCE_SALARY',
    payload: { nextSalary }
  }),

  requestSalariesUpdate: () => dispatch({
    type: 'REQUEST_SALARIES_UPDATE'
  }),

  updateCitySelected: cityInfo => dispatch({
    type: 'UPDATE_REFERENCE_CITY',
    payload: { cityInfo }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCardReference);
