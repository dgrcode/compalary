import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import CitySelector from '../CitySelector';

class CityCard extends React.Component {
  static propTypes = {
    computed: PropTypes.object,
    cardId: PropTypes.string.isRequired,
    updateCitySelected: PropTypes.func.isRequired,
    requestCardSalaryUpdate: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.computed = this.props.computed[this.props.cardId];
  }

  handleCitySelected = cityInfo => {
    this.props.updateCitySelected(this.props.cardId, cityInfo);
    this.props.requestCardSalaryUpdate(this.props.cardId);
  }

  render () {
    return (
      <div>
        <CitySelector handleCitySelected={this.handleCitySelected} />
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

  requestCardSalaryUpdate: cardId => dispatch({
    type: 'REQUEST_CARD_SALARY_UPDATE',
    payload: { cardId }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
