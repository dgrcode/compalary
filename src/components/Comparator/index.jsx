import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import CityCard from '../CityCard'
import AddCardButton from '../AddCardButton'
import './style.sass'

export const Comparator = ({ cards }) => (
  <div className='flex cardList'>
    {
      Object.keys(cards).map(cardId =>
        <CityCard key={cardId} cardId={cardId} />
      )
    }
    {Object.keys(cards).length < 4 &&
      <AddCardButton />
    }
  </div>
)

Comparator.propTypes = {
  cards: PropTypes.object
}

const mapStateToProps = state => ({
  cards: state.card
})

export default connect(mapStateToProps)(Comparator)
