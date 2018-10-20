import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import '../../res/styles/citycard.sass';
import CitySelector from '../CitySelector';
import CurrencyPicker from '../CurrencySelector';

import { equivalentSalary } from '../../selectors/computedSelector';

class CityCard extends React.Component {
  static propTypes = {
    computed: PropTypes.object,
    cardId: PropTypes.string.isRequired,
    updateCitySelected: PropTypes.func.isRequired,
    updateCurrencySelected: PropTypes.func.isRequired,
    resetCityInfo: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.computed = this.props.computed[this.props.cardId];
  }

  handleCitySelected = cityInfo => {
    if (cityInfo === null) {
      this.props.resetCityInfo(this.props.cardId);
      return;
    }

    this.props.updateCitySelected(this.props.cardId, cityInfo);
  }

  handleCurrencySelected = currency => {
    this.props.updateCurrencySelected(this.props.cardId, currency);
  }

  render () {
    return (
      <div className="citycard">
        <div className="flex">
          <CitySelector className="growWidth marginRight" handleCitySelected={this.handleCitySelected} />
          <CurrencyPicker handleCurrencySelected={this.handleCurrencySelected}/>
        </div>
        <div className="withMargin">Gitlab: {this.props.computed ? this.props.computed.gitlab : 0}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, { cardId }) => ({
  computed: equivalentSalary(state, cardId)
});

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
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
