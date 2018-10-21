import React from 'react'
import './style.sass'
import CityCardReference from '../CityCardReference'

const Header = () => (
  <div className='title'>
    <h1>💸 COMPALARY 💸</h1>
    <p>Compare salaries between different cities</p>
    <CityCardReference />
  </div>
)

export default Header
