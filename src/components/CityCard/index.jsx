import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import '../../res/styles/citycard.sass';
import CitySelector from '../CitySelector';
import CurrencyPicker from '../CurrencySelector';

class CityCard extends React.Component {
  static propTypes = {
    computed: PropTypes.object,
    cardId: PropTypes.string.isRequired,
    updateCitySelected: PropTypes.func.isRequired,
    updateCurrencySelected: PropTypes.func.isRequired,
    requestCardSalaryUpdate: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.computed = this.props.computed[this.props.cardId];
  }

  handleCitySelected = cityInfo => {
    if (cityInfo === null) {
      this.props.resetCity(this.props.cardId);
      this.props.resetCitySalary(this.props.cardId);
      return;
    }

    this.props.updateCitySelected(this.props.cardId, cityInfo);
    this.props.requestCardSalaryUpdate(this.props.cardId);
  }

  handleCurrencySelected = currency => {
    this.props.updateCurrencySelected(this.props.cardId, currency);
    this.props.requestCardSalaryUpdate(this.props.cardId);
  }

  render () {
    return (
      <div className="citycard">
        <CitySelector handleCitySelected={this.handleCitySelected} />
        <CurrencyPicker handleCurrencySelected={this.handleCurrencySelected}/>
        <span>{this.props.computed[this.props.cardId] ? this.props.computed[this.props.cardId].gitlab : 0}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  computed: state.computed
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

  requestCardSalaryUpdate: cardId => dispatch({
    type: 'REQUEST_CARD_SALARY_UPDATE',
    payload: { cardId }
  }),

  resetCity: cardId => dispatch({
    type: 'RESET_CITY',
    payload: { cardId }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
