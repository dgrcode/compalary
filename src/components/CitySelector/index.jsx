import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CitySelector extends React.Component {
  static propTypes = {
    rentIndexData: PropTypes.array.isRequired,
    handleCitySelected: PropTypes.func.isRequired
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
    const selectedCountry = evt.target.value;

    this.countrySelected(selectedCountry);
  }

  handleCityChange = evt => {
    const idx = evt.target.value;
    const cityInfo = this.state.cities[idx];

    this.props.handleCitySelected(cityInfo);

    this.setState({
      selectedCity: cityInfo.city
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
              this.state.cities.map((cityInfo, idx) => (
                <option key={idx} value={idx}>{cityInfo.fullName}</option>
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
