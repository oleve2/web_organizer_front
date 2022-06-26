import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';

import store from './rtkstore/store';
import { Provider } from 'react-redux';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice */}
  {/*<React.StrictMode></React.StrictMode>*/}
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
