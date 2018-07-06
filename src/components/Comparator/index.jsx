import React from 'react';
import PropTypes from 'prop-types';

export default class Comparator extends React.Component {
  static propTypes = {
    rentIndexData: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props);

    this.countries = props.rentIndexData.reduce((acc, { country }) => acc.add(country), new Set());
    this.countries = Array.from(this.countries).sort();
  }

  handleCountryChange = evt => {
    console.log(`country changed to ${evt.target.value}`);
  }

  render () {
    return (
      <div>
        <select id="country-select" onChange={this.handleCountryChange}>
          {this.countries.map((country, idx) => (
            <option ket={idx} value={country}>{country}</option>
          ))}
        </select>
      </div>
    );
  }
}
