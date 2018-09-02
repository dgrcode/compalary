import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.sass';
import CityPicker from './CityPicker';

class CitySelector extends React.Component {
  static propTypes = {
    rentIndexData: PropTypes.array.isRequired,
    handleCitySelected: PropTypes.func.isRequired
  }

  handleCityChange = cityInfo => {
    this.props.handleCitySelected(cityInfo);
  }

  toggleEdit = () => {
    this.setState({ isEditMode: !this.state.isEditMode });
  }

  render () {
    return (
      <div className="citySelector">
        <CityPicker
          cities={this.props.rentIndexData}
          handleCityChange={this.handleCityChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rentIndexData: state.data.rentIndexData
});

export default connect(mapStateToProps)(CitySelector);
