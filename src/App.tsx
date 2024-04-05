import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FC, useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// drag and drop enable
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend';


// components
import BaseCardSingle from '@/components/base/baseCardSingle';
import BaseCardNew from '@/components/base/baseCardNew';
import Login from '@/components/auth/Login';

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


// pages
const PageHome = lazy(() => import('./pages/PageHome'));
const PageBase = lazy(() => import('./pages/PageBase'));
const PageActivities = lazy(() => import('./pages/PageActivities'));
const PageAnalyticsByOne = lazy(() => import('./pages/PageAnalytics'));
const PageUpDownload = lazy(() => import('./pages/PageUpDownload'));
const PageD3 = lazy(() => import('./pages/PageD3'));
const PageCalendar = lazy(() => import('./pages/PageCalendar'));
const PageTaskPlanner = lazy(() => import('./pages/PageTaskPlanner'));
const PageTests = lazy(() => import('./pages/PageTests'));




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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/base' element={<PageBase/>}></Route>
          <Route path='/base/new' element={<BaseCardNew/>}></Route>
          <Route path='/base/:id' element={<BaseCardSingle/>}></Route>
          <Route path='/activities_manage' element={<PageActivities/>}></Route>
          <Route path='/analytics' element={<PageAnalyticsByOne/>}></Route>
          <Route path='/updownload' element={<PageUpDownload/>}></Route>
          <Route path='/d3_showcase' element={<PageD3/>}></Route>
          <Route path='/calendar' element={<PageCalendar/>}></Route>
          <Route path='/task_planner' element={<PageTaskPlanner/>}></Route>
          <Route path='/tests' element={<PageTests />}></Route>
        </Routes>
      </Suspense>

      </BrowserRouter>
    </div>    
    </>
    }
  </DndProvider>
  </>
  );
}

export default App;
