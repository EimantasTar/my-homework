import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ColdApp } from './hot-cold';

ReactDOM.render(
    <ColdApp />,
    document.getElementById('root') || document.createElement('div')); // for testing purposes


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
