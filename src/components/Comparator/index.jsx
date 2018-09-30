import React from 'react';

import CityCard from '../CityCard';
import CityCardReference from '../CityCardReference';

export default class Comparator extends React.Component {
  render () {
    return (
      <div>
        <div /*className="flex"*/>
          <CityCardReference />
        </div>
        <CityCard cardId="card0" />
      </div>
    );
  }
}
