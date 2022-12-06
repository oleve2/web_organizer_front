import React from 'react';
//import ReactDOM from 'react-dom';
//import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './rtkstore/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/* https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice */
/*<React.StrictMode></React.StrictMode>*/
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
