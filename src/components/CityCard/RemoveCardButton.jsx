import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import './style.sass'

const RemoveCardButton = ({ cardId, removeCard }) => (
  <div
    className='removeCardButton'
    onClick={() => removeCard(cardId)}>
    ×
  </div>
)

RemoveCardButton.propTypes = {
  cardId: PropTypes.string.isRequired,
  removeCard: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  removeCard: cardId => ({
    type: 'REMOVE_CITY_CARD',
    payload: { cardId }
  })
}

export default connect(null, mapDispatchToProps)(RemoveCardButton)
