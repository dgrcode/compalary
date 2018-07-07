import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import CitySelector from '../CitySelector';

class CityCard extends React.Component {
  static propTypes = {
    computed: PropTypes.object,
    cardId: PropTypes.string
  }

  constructor (props) {
    super(props);

    this.computed = this.props.computed[this.props.cardId];
    this.equivalentSalary = this.computed ? this.computed.equivalentSalary : 0;
  }

  render () {
    return (
      <div>
        <CitySelector />
        <span>{this.equivalentSalary}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  computed: state.computed
});

export default connect(mapStateToProps)(CityCard);
