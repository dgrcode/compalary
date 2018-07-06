import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';

import rentIndexData from '../data/rentIndex.json';

import Header from './components/Header';
import Comparator from './components/Comparator';

const currencyConversionApi = (fromCurrency, toCurrency) => `https://free.currencyconverterapi.com/api/v5/convert?q=${fromCurrency}_${toCurrency}&compact=ultra`;

const store = createStore(() => {});

const App = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Comparator rentIndexData={rentIndexData}/>
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
