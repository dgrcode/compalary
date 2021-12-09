import React from 'react'
import './style.sass'

const Footer = () => (
  <div className='footer'>
    Made with ❤️ by{' '}
    <a href='https://twitter.com/dgrcode' target='_blank'>
      dgrcode
    </a>
    . Cost of living data from{' '}
    <a
      href='https://www.numbeo.com/cost-of-living/comparison.jsp'
      target='_blank'
    >
      Numbeo
    </a>
    . Rates by{' '}
    <a href='https://www.exchangerate-api.com' target='_blank'>
      Exchange Rate API
    </a>
  </div>
)

export default Footer
