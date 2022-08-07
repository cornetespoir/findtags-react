import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

console.log('%c🍳 hello! visit %chttps://github.com/cornetespoir/findtags-react %cto learn more about this project!', 'font-size:14px;', 'color:cornflowerblue; font-weight:bold; font-size:14px;', 'color:auto; font-size:14px;')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
