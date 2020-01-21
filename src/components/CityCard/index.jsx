import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import '../../res/styles/citycard.sass'
import CitySelector from '../CitySelector'
import CurrencyPicker from '../CurrencySelector'
import RemoveCardButton from './RemoveCardButton'

import { equivalentSalary } from '../../selectors/computedSelector'
import comparisons from '../../utils/salaryComparisons'

class CityCard extends React.Component {
  constructor (props) {
    super(props)

    this.handleCitySelected = this.handleCitySelected.bind(this)
    this.handleCurrencySelected = this.handleCurrencySelected.bind(this)
  }

  handleCitySelected (cityInfo) {
    if (cityInfo === null) {
      this.props.resetCityInfo(this.props.cardId)
      return
    }

    this.props.updateCitySelected(this.props.cardId, cityInfo)
  }

  handleCurrencySelected (currency) {
    this.props.updateCurrencySelected(this.props.cardId, currency)
  }

  render () {
    const {
      cardId,
      computed,
      visible
    } = this.props

    const visibleSet = new Set(visible)

    return (
      <div className='citycard'>
        <RemoveCardButton cardId={cardId} />
        <div className='flex'>
          <CitySelector className='growWidth marginRight' handleCitySelected={this.handleCitySelected} />
          <CurrencyPicker handleCurrencySelected={this.handleCurrencySelected} />
        </div>
        {Object.entries(comparisons).map(([comparisonKey, comparison]) =>
          visibleSet.has(comparisonKey) &&
          (
            <div className='withMargin' key={comparisonKey}>
              {comparison.title}: {computed ? computed[comparisonKey] : 0}
            </div>
          )
        )}
      </div>
    )
  }
}

CityCard.propTypes = {
  computed: PropTypes.object,
  cardId: PropTypes.string.isRequired,
  updateCitySelected: PropTypes.func.isRequired,
  updateCurrencySelected: PropTypes.func.isRequired,
  resetCityInfo: PropTypes.func.isRequired,
  visible: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state, { cardId }) => ({
  computed: equivalentSalary(state, cardId),
  visible: state.comparison.visible
})

const mapDispatchToProps = dispatch => ({
  updateCitySelected: (cardId, cityInfo) => dispatch({
    type: 'UPDATE_CARD_CITY',
    payload: {
      cardId,
      cityInfo
    }
  }),

  updateCurrencySelected: (cardId, currency) => dispatch({
    type: 'UPDATE_CARD_CURRENCY',
    payload: {
      cardId,
      currency
    }
  }),

  resetCityInfo: cardId => dispatch({
    type: 'RESET_CITY_INFO',
    payload: { cardId }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(CityCard)
