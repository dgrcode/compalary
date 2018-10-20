import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import CityCard from '../CityCard'
import CityCardReference from '../CityCardReference'
import AddCardButton from '../AddCardButton'

export const Comparator = ({ cards }) => (
  <div>
    <div className='flex'>
      <CityCardReference />
    </div>
    <div className='flex'>
      {
        Object.keys(cards).map(cardId =>
          <CityCard key={cardId} cardId={cardId} />
        )
      }
      {Object.keys(cards).length < 4 &&
        <AddCardButton />
      }
    </div>
  </div>
)

Comparator.propTypes = {
  cards: PropTypes.object
}

const mapStateToProps = state => ({
  cards: state.card
})

export default connect(mapStateToProps)(Comparator)
