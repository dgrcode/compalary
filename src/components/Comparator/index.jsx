import React from 'react';
import PropTypes from 'prop-types';
import CitySelector from '../CitySelector';

export default class Comparator extends React.Component {
  static propTypes = {
    rentIndexData: PropTypes.array.isRequired
  }

  render () {
    return (
      <div>
        <CitySelector id={`citySelector1`} rentIndexData={this.props.rentIndexData} />
        <CitySelector id={`citySelector2`} rentIndexData={this.props.rentIndexData} />
      </div>
    );
  }
}
