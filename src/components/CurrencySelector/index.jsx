import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

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
]

const customStyle = className => ({
  indicatorsContainer: () => ({ display: 'none' }),
  control: base => ({
    ...base,
    width: '80px',
    backgroundColor: className === 'overDark' ? '#fff4' : 'white',
    borderColor: '#0002',
    cursor: 'pointer'
  }),
  option: base => ({
    ...base,
    color: 'rgba(0, 0, 0, .87)'
  }),
  singleValue: base => ({
    ...base,
    color: className === 'overDark' ? 'white' : 'rgba(0, 0, 0, .87)'
  })
})

export default class CurrencyPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedOption: moneyOptions[0]
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (arg) {
    this.setState({ selectedOption: arg })
    this.props.handleCurrencySelected(arg.value)
  }

  render () {
    const { selectedOption } = this.state

    return (
      <Select
        styles={customStyle(this.props.className)}
        options={moneyOptions}
        onChange={this.handleSelect}
        value={selectedOption}
        isSearchable={false}
      />
    )
  }
}

CurrencyPicker.propTypes = {
  className: PropTypes.string,
  handleCurrencySelected: PropTypes.func.isRequired
}

CurrencyPicker.defaultProps = {
  className: ''
}
