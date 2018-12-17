import React from 'react'
import PropTypes from 'prop-types'

const Var = ({ children }) => <span className='variable'>{children}</span>

Var.propTypes = {
  children: PropTypes.node.isRequired
}

export default Var
