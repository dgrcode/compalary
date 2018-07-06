import React from 'react';
import CitySelector from '../CitySelector';

export default class Comparator extends React.Component {
  render () {
    return (
      <div>
        <CitySelector id={`citySelector1`} />
        <CitySelector id={`citySelector2`} />
      </div>
    );
  }
}
