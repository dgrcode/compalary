import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';

import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

export default class CityPicker extends React.Component {
  static propTypes = {
    cities: PropTypes.array.isRequired,
    handleCityChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      selectedOption: -1
    };
  }

  handleChange = selection => {
    if (selection === null) {
      return this.handleClearValue();
    }
    return this.handleSelect(selection);
  }

  handleSelect = arg => {
    this.setState({ selectedOption: arg.value });
    this.props.handleCityChange(this.props.cities[arg.value]);
  }

  handleClearValue = () => {
    this.setState({ selectedOption: -1 });
    this.props.handleCityChange(null);
  }

  render () {
    const { cities } = this.props;
    return (
      <div>
        <Select
          options={cities.map((val, idx) => ({
            value: idx,
            label: `${val.city}${val.state ? `, ${val.state}` : ''}, ${val.country}`
          }))}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          isClearable
          clearValue={this.handleClearValue}
        />
      </div>
    );
  }
}
