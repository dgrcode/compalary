import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CitySelector extends React.Component {
  static propTypes = {
    rentIndexData: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      selectedCountry: 'Ireland',
      selectedCity: '',
      cities: ['']
    };

    this.countries = props.rentIndexData.reduce((acc, { country }) => acc.add(country), new Set());
    this.countries = Array.from(this.countries).sort();
  }

  componentDidMount () {
    this.countrySelected(this.state.selectedCountry);
  }

  handleCountryChange = evt => {
    console.log(`country changed to ${evt.target.value}`);
    const selectedCountry = evt.target.value;

    this.countrySelected(selectedCountry);
  }

  handleCityChange = evt => {
    console.log(`city changed to ${evt.target.value}`);

    this.setState({
      selectedCity: evt.target.value
    });
  }

  countrySelected = selectedCountry => this.setState({
    selectedCountry,
    cities: this.props.rentIndexData
      .filter(({ country }) => country === selectedCountry)
      .map((cityObj) => {
        cityObj.fullName = cityObj.state ? `${cityObj.city}, ${cityObj.state}` : cityObj.city;
        return cityObj;
      })
      .sort()
  });

  render () {
    const selectedCountry = this.state.selectedCountry;
    const selectedCity = this.state.selectedCity;
    return (
      <div>
        <label> Country:
          <select id="country-select" defaultValue={selectedCountry} onChange={this.handleCountryChange}>
            {this.countries.map((country, idx) => (
              <option key={idx} value={country} >
                {country}
              </option>
            ))}
          </select>
        </label>
        <label> City
          <select id="city-select" defaultValue={selectedCity} onChange={this.handleCityChange}>
            {
              this.state.cities.map(({ fullName, rentIdx }, idx) => (
                <option key={idx} value={rentIdx}>{fullName}</option>
              ))
            }
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rentIndexData: state.data.rentIndexData
});

export default connect(mapStateToProps)(CitySelector);
