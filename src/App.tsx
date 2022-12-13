import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// drag and drop enable
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend';

// pages
import PageHome from './pages/PageHome';
import PageBase from './pages/PageBase';
import PageActivities from './pages/PageActivities';
import PageAnalyticsByOne from './pages/PageAnalytics';
import PageUpDownload from './pages/PageUpDownload';

// components
import BaseCardSingle from './components/base/baseCardSingle';
import BaseCardNew from './components/base/baseCardNew';
import Login from './components/auth/Login';

// hooks
import useWindowDimensions from './hooks/useWindowDimensions';

// store
import { RootState, AppDispatch } from './rtkstore/store';
import { fetchBaseItems } from './rtkstore/baseReducer';
import { fetchActivLogs } from './rtkstore/activsReducer';
import { fetchTCTags } from './rtkstore/tagCloudReducer';
import { datesSetupOther } from './rtkstore/analyticReducer';

import { fromLS } from './rtkstore/authReducer';
import { setLoginToken } from './rtkstore/authReducer';

// https://stackoverflow.com/questions/70098392/react-chartjs-2-with-chartjs-3-error-arc-is-not-a-registered-element
import 'chart.js/auto';

const App:FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storeToken = useSelector( (store: RootState) => store.authReducer.token)
  const windim = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //
  useEffect( () => {
    // 
    dispatch(fromLS({}));
    // data fetch
    dispatch(fetchBaseItems({}));
    dispatch(fetchActivLogs({}));
    dispatch(fetchTCTags({}));
    
    // calculate dates for analytics
    dispatch( datesSetupOther({}) );
  }, [dispatch])

  useEffect( () => {
    if (windim !== undefined) {
      if (windim.width! < 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false)
      }
      //console.log(`isMobile=${isMobile}`);
    }
  },[windim, isMobile])  

  //
  const validateLogPass = async (login: string, pass: string) => {
    if (login === process.env.REACT_APP_LOGIN && pass === process.env.REACT_APP_PASSWORD) {
      let token = login+'_authenticated';
      dispatch(setLoginToken({login: login, token:token}));  // to store and ls
    } else {
      alert('Incorrect logini/password!');
    }
  }

  // react dnd backends https://stackoverflow.com/questions/57203397/reactdnd-touch-backend
  //
  return (<>
  <DndProvider backend={(isMobile) ?TouchBackend :HTML5Backend} options={{ enableMouseEvents: true }}>
    { (storeToken === '') 
    ? <>
      <Login validateLogPass={validateLogPass}/>
    </>
    : <>
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/base' element={<PageBase/>}></Route>
          <Route path='/base/new' element={<BaseCardNew/>}></Route>
          <Route path='/base/:id' element={<BaseCardSingle/>}></Route>
          <Route path='/activities_manage' element={<PageActivities/>}></Route>
          <Route path='/analytics' element={<PageAnalyticsByOne/>}></Route>
          <Route path='/updownload' element={<PageUpDownload/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>    
    </>
    }
  </DndProvider>
  </>
  );
}

export default App;
