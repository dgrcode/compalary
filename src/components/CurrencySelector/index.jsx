import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const moneyOptions = [
  {
    value: 'EUR',
    label: '€ (EUR)'
  },
  {
    value: 'USD',
    label: '$ (USD)'
  }, {
    value: 'GBP',
    label: '£ (GBP)'
  }
];

const customStyle = {
  indicatorsContainer: () => ({ display: 'none' }),
  control: base => ({
    ...base,
    width: '80px',
    backgroundColor: 'white'
  })
};

export default class CurrencyPicker extends React.Component {
  static propTypes = {
    handleCurrencySelected: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      selectedOption: moneyOptions[0]
    };
  }

  handleSelect = arg => {
    this.setState({ selectedOption: arg });
    this.props.handleCurrencySelected(arg.value);
  }

  render () {
    const { selectedOption } = this.state;

    return (
      <Select
        styles={customStyle}
        options={moneyOptions}
        onChange={this.handleSelect}
        value={selectedOption}
        isSearchable={false}
      />
    );
  }
}
