import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './baseReducer';
import activsReducer from './activsReducer';
import analyticReducer from './analyticReducer';
import authReducer from './authReducer';
import upDownReducer from './upDownReducer';
//import thunk from 'redux-thunk';

//
const store = configureStore({
  reducer: {
    baseReducer: baseReducer,
    activsReducer: activsReducer,
    analyticReducer: analyticReducer,
    authReducer: authReducer,
    upDownReducer: upDownReducer,
  }
})

export default store;
