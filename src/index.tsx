import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '@utils/configure-store';
import App from './App';

import '@styles/global-styles.scss';

const store = configureStore();
const mountNode = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
