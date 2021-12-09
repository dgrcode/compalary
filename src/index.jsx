import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { PropTypes } from 'prop-types'

import './res/styles/global.sass'
import citiesData from '../data/citiesData.json'
import fallbackExchangeRates from '../data/fallbackExchangeRates.js'
import reducer from './reducers'
import Header from './components/Header'
import CardList from './components/CardList'
import FormulaDefinitions from './components/FormulaDefinitions'
import Footer from './components/Footer'
import { setExchangeRates } from './actions/dataActions'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch({
  type: 'CITIES_DATA',
  payload: { citiesData },
})

const fetchUpdatedExchangeRates = async () => {
  let parsedResponse
  try {
    const response = await fetch('https://api.exchangeratesapi.io/latest')
    if (response.status < 200 || response.status > 299) {
      throw new Error(
        'Exchange rates api - unsuccessful response. Using fallback data'
      )
    }
    parsedResponse = await response.json()
  } catch (error) {
    console.warn(error.message)
    store.dispatch(
      setExchangeRates({
        rates: fallbackExchangeRates,
        isUpToDate: false,
      })
    )
    return
  }

  store.dispatch(
    setExchangeRates({
      rates: parsedResponse.rates,
      isUpToDate: true,
    })
  )
}
fetchUpdatedExchangeRates()

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
  store: PropTypes.object.isRequired,
}

ReactDOM.render(<App store={store} />, document.getElementById('root'))
