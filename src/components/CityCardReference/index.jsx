import React from 'react';
import CitySelector from '../CitySelector';

export default class CityCardReference extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <CitySelector />
        <label>Salary
          <input type="text" />
        </label>
      </div>
    );
  }
}
