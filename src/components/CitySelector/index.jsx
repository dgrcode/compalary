import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.sass'
import CityPicker from './CityPicker'

class CitySelector extends React.Component {
  constructor (props) {
    super(props)

    this.handleCityChange = this.handleCityChange.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  handleCityChange (cityInfo) {
    this.props.handleCitySelected(cityInfo)
  }

  toggleEdit () {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  render () {
    return (
      <div className={`citySelector ${this.props.className}`}>
        <CityPicker
          cities={this.props.citiesData}
          handleCityChange={this.handleCityChange}
        />
      </div>
    )
  }
}

CitySelector.propTypes = {
  citiesData: PropTypes.array.isRequired,
  handleCitySelected: PropTypes.func.isRequired,
  className: PropTypes.string
}

const mapStateToProps = state => ({
  citiesData: state.data.citiesData
})

export default connect(mapStateToProps)(CitySelector)
