import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { PropTypes } from 'prop-types'

import './res/styles/global.sass'
import citiesData from '../data/citiesData.json'
import reducer from './reducers'
import Header from './components/Header'
import CardList from './components/CardList'
import FormulaDefinitions from './components/FormulaDefinitions'
import Footer from './components/Footer'
import { currencyConversionUrl } from './utils'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({
  type: 'CITIES_DATA',
  payload: { citiesData }
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
    <React.Fragment>
      <Header />
      <CardList />
      <FormulaDefinitions />
      <Footer />
    </React.Fragment>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
