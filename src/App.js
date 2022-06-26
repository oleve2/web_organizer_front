import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { /*useState,*/ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// pages
import PageHome from './pages/PageHome';
import PageBase from './pages/PageBase';
import PageActivities from './pages/PageActivities';
import PageAnalyticsByOne from './pages/PageAnalytics';

// components
import BaseCardSingle from './components/base/baseCardSingle';
import BaseCardNew from './components/base/baseCardNew';
import Login from './components/auth/Login';

// store
import { fetchBaseItems } from './rtkstore/baseReducer';
import { fetchActivLogs } from './rtkstore/activsReducer';
import { datesSetup, datesSetupOther } from './rtkstore/analyticReducer';

import { fromLS } from './rtkstore/authReducer';
import { setLoginToken } from './rtkstore/authReducer';

// https://stackoverflow.com/questions/70098392/react-chartjs-2-with-chartjs-3-error-arc-is-not-a-registered-element
import 'chart.js/auto';

function App() {
  const dispatch = useDispatch();
  const storeToken = useSelector( (store) => store.authReducer.token)

  useEffect( () => {
    // login LS check
    dispatch(fromLS());
  },[])

  useEffect( () => {
    // data fetch
    dispatch(fetchBaseItems());
    dispatch(fetchActivLogs());
    
    // calculate dates for analytics
    //dispatch( datesSetup() );
    dispatch( datesSetupOther() );
  }, [])

  const validateLogPass = async (login, pass) => {
    if (login === process.env.REACT_APP_LOGIN && pass === process.env.REACT_APP_PASSWORD) {
      let token = login+'_authenticated';
      dispatch(setLoginToken(login, token));  // to store and ls
    } else {
      alert('Incorrect logini/password!');
    }
  }

  if (storeToken === '') {
    return <Login validateLogPass={validateLogPass}/>
  }

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/base' element={<PageBase/>}></Route>
          <Route path='/base/new' element={<BaseCardNew/>}></Route>
          <Route path='/base/:id' element={<BaseCardSingle/>}></Route>
          <Route path='/activities_manage' element={<PageActivities/>}></Route>
          <Route path='/analytics' element={<PageAnalyticsByOne/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
