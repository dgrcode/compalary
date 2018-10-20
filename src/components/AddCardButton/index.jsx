import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import './style.sass'

const AddCardButton = ({ addNewCard }) => (
  <div
    className='addCardButton'
    onClick={addNewCard}>
    +
  </div>
)

AddCardButton.propTypes = {
  addNewCard: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addNewCard: () => ({
    type: 'ADD_CITY_CARD'
  })
}

export default connect(null, mapDispatchToProps)(AddCardButton)
