import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// reducers
import baseReducer from './baseReducer';
import activsReducer from './activsReducer';
import analyticReducer from './analyticReducer';
import authReducer from './authReducer';
import upDownReducer from './upDownReducer';
import tagCloudReducer from './tagCloudReducer';
import calendarReducer from './calendarReducer';

//
export const store = configureStore({
  reducer: {
    baseReducer: baseReducer,
    activsReducer: activsReducer,
    analyticReducer: analyticReducer,
    authReducer: authReducer,
    upDownReducer: upDownReducer,
    tagCloudReducer: tagCloudReducer,
    calendarReducer: calendarReducer,
  }, 
  devTools: process.env.REACT_APP_NODEENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
