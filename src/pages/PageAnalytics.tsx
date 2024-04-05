
import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import ModBarChart from '@/components/activities/ModBarChart';
import Navigation from '@/components/layout/Navigation';

// https://codepen.io/Abraxas666/pen/vYKoRvy
import { Chart } from 'react-chartjs-2';
// https://stackoverflow.com/questions/70158529/using-chart-js-options-with-react-chartjs-2-and-typescript

// store
import { RootState, AppDispatch } from '@/rtkstore/store';
import { datesSetupOther } from '@/rtkstore/analyticReducer';
import { fetchCommonGraphsStore, fetchIndividualgraphsStore, options } from '@/rtkstore/analyticReducer';
import { actionsAnalyticRed } from '@/rtkstore/analyticReducer'; 

// style
import './PageAnalytics.css';

interface PageActivitiesAnalyticsProps {}

//
const PageActivitiesAnalytics:FC<PageActivitiesAnalyticsProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  // control params
  const {
    storeDF, 
    storeDT,
    storeCommGraphData,
    storeIndivGraphData,

    flgRepCommonDone,
    flgIndivGraphDone,
  } = useSelector( (store: RootState) => ({
    storeDF:              store.analyticReducer.dateFrom,
    storeDT:              store.analyticReducer.dateTo,
    storeCommGraphData:   store.analyticReducer.dataRepCommon,
    storeIndivGraphData:  store.analyticReducer.dataIndivGraphs,

    flgRepCommonDone:     store.analyticReducer.flgRepCommonDone,
    flgIndivGraphDone:    store.analyticReducer.flgIndivGraphDone,
  }));

  const chartTypes: string[] = ['bar','line']; //,'pie'
  const [typeSelected, setTypeSelected] = useState('bar');


  // -------------------------------------
  const RefreshData = useCallback( async () => {
    dispatch(fetchIndividualgraphsStore({dateFrom: storeDF, dateTo: storeDT}))
    dispatch(fetchCommonGraphsStore({dateFrom: storeDF, dateTo: storeDT}))
  },[dispatch, storeDF, storeDT])

  useEffect( () => {
    document.title = "WA3: Analytics";
    dispatch(datesSetupOther({}));
  },[])

  useEffect( () => {
    RefreshData();
  },[storeDF, storeDT]) 


  // --------------------------------------
  return (
    <>
      <Navigation/>
      <hr/>       
      
      <h2>Controls</h2>
      <button type="button" onClick={RefreshData}>Refresh </button> <br/>
      <br />

      <div>
        <div>from <b>{storeDF}</b> to <b>{storeDT}</b></div>

        <div className='datediv_wrapper'>
          <div className='dateDiv'>Date from:</div> 
          <input type="date" value={storeDF} onChange={(e) => { dispatch(actionsAnalyticRed.setDateFrom(e.target.value)) }} /> 
        </div>

        <div className='datediv_wrapper'>
          <div className='dateDiv'>Date to:</div> 
          <input type="date" value={storeDT} onChange={(e) => { dispatch(actionsAnalyticRed.setDateTo(e.target.value)) }} /> 
        </div>
      </div>

      <hr/>

      <h2>Activities charts (alltogether)</h2>
      <button type="button" onClick={() => {
        dispatch(fetchIndividualgraphsStore({dateFrom: storeDF, dateTo: storeDT}))
      }}>get common graph data</button>
      {/*<div>{JSON.stringify(storeIndivGraphData)}</div>*/}
      
      { (flgIndivGraphDone) 
        ? <> <Chart type='bar' options={options} data={storeIndivGraphData} /> </> 
        : <></> 
      }
      
      
      <hr/>

      <h2>Bar types to select</h2>
      <div className='base-partsArr-list'>
        { chartTypes.map( (item) => {
          return <div key={item} 
            className={"base-partsArr-list__item " + (item === typeSelected ? 'base-partsArr-list__item_active' : '')} 
            onClick={() => { setTypeSelected(item) }}
            >
            {item}</div>
        }) }
      </div>

      <h2>Activities charts (individual)</h2>
      <button type="button" onClick={() => {
        dispatch(fetchCommonGraphsStore({dateFrom: storeDF, dateTo: storeDT}))
      }}>get individual graph data</button>
      {/*<div>{JSON.stringify(storeCommGraphData)}</div>*/} 
      <div className='ul-charts'>
        {
          (flgRepCommonDone)
          ? <>
          { storeCommGraphData.map( (item) => {
            return <ModBarChart key={item.chart_name_id}
                type={typeSelected}
                chartName={item.chart_name}
                labels={item.labels}
                datasets={item.data}
                data2={item.data2!}
                f1="api"
              />
          }) }
          </> 
          : <></> 
        }
      </div>
       
    </>
  )
}

export default PageActivitiesAnalytics;
