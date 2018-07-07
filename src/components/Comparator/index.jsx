import React from 'react';
import CityCard from '../CityCard';
import CityCardReference from '../CityCardReference';

export default class Comparator extends React.Component {
  render () {
    return (
      <div>
        <CityCardReference />
        <CityCard />
      </div>
    );
  }
}
