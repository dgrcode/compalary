import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { PropTypes } from 'prop-types'

import './res/styles/global.sass'
import rentIndexData from '../data/rentIndex.json'
import reducer from './reducers'
import Header from './components/Header'
import Comparator from './components/Comparator'
import { currencyConversionUrl } from './utils'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({
  type: 'DATA_RENT_INDEX',
  payload: { rentIndexData }
})

const addCurrencyExchange = (currencyA, currencyB) => {
  fetch(currencyConversionUrl(currencyA, currencyB))
    .then(res => res.json())
    .then(res => store.dispatch({
      type: 'EXCHANGE_RATE_UPDATE',
      payload: {
        currencyFrom: currencyA,
        currencyTo: currencyB,
        value: res[`${currencyA}_${currencyB}`]
      }
    }))
}

addCurrencyExchange('EUR', 'USD')
addCurrencyExchange('EUR', 'GBP')
addCurrencyExchange('GBP', 'USD')

const App = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Comparator />
    </div>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
