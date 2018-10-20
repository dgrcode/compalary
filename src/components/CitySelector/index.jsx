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
          cities={this.props.rentIndexData}
          handleCityChange={this.handleCityChange}
        />
      </div>
    )
  }
}

CitySelector.propTypes = {
  rentIndexData: PropTypes.array.isRequired,
  handleCitySelected: PropTypes.func.isRequired,
  className: PropTypes.string
}

const mapStateToProps = state => ({
  rentIndexData: state.data.rentIndexData
})

export default connect(mapStateToProps)(CitySelector)
