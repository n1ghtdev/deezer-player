import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './styles/global-styles.scss';

const mountNode = document.getElementById('root');

render(<App />, mountNode);
