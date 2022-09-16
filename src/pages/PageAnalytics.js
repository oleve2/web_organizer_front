
import Navigation from '../components/layout/Navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// components
import ModBarChart from '../components/activities/ModBarChart';

// https://codepen.io/Abraxas666/pen/vYKoRvy
import { Chart } from 'react-chartjs-2';

import { datesSetupOther } from '../rtkstore/analyticReducer';

// style
import './PageAnalytics.css';

//
export default function PageActivitiesAnalytics(props) {
  const bgCol = [
    '#FFFF00','#0000FF','#FF7F00','#00FF00','#4B0082','#9400D3','#FF0000',
    '#0048BA','#B0BF1A','#7CB9E8','#C0E8D5','#B284BE','#72A0C1','#EDEAE0','#DB2D43','#FF91AF',
    '#C46210','#EFDECD','#E52B50','#E52B50','#3B7A57','#915C83','#D0FF14','#007FFF','#318CE7',
  ];

  // common graph data
  const [commGraphData, setCommGraphData] = useState('');
  const [FlgCommGraphDataLoaded, setFlgCommGraphDataLoaded] = useState(false);

  // individual graph list data
  const [indivGraphData, setIndivGraphData] = useState([]);
  const [flgIndivGraphDataLoaded, setFlgIndivGraphDataLoaded] = useState(false);

  // control params
  const storeDF = useSelector( (store) => store.analyticReducer.dateFrom);  // store
  const storeDT = useSelector( (store) => store.analyticReducer.dateTo);    // store

  const [dateFrom, setDateFrom] = useState(storeDF); //'2022-05-01'
  const [dateTo, setDateTo]     = useState(storeDT); //'2022-06-01'

  const chartTypes = ['bar','line']; //,'pie'
  const [typeSelected, setTypeSelected] = useState('bar');


  // -------------------------------------
  const fetchCommonGraphs = async () => {
    setFlgIndivGraphDataLoaded(false);
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/common_graphs/${dateFrom}/${dateTo}`, {method: 'GET'});
    let dataJson = await resp.json();
    //
    let lngth = bgCol.length;
    let dataJson2 = dataJson.map( (elem, index) => {
      return {
          ...elem, 
          data2: {
            label: elem.chart_name,
            data: elem.data, 
            backgroundColor: bgCol[index % lngth],
            borderColor: bgCol[index % lngth]
          }
      }
    })
    //
    setIndivGraphData(dataJson2);
    setFlgIndivGraphDataLoaded(true);
  }

  // -------------------------------------
  const fetchIndividualgraphs = async () => {
    setFlgCommGraphDataLoaded(false);
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/individual_graphs/${dateFrom}/${dateTo}`, {method: 'GET'});
    let dataJson = await resp.json();
    //console.log('activ4 data = ', dataJson);
    //
    let lngth = bgCol.length;
    let datasetsMod = dataJson.datasets.map( (elem, index) => {
      return {
        ...elem, 
        data: elem.data.map( (item) => (item === 0) ? null : item ),
        backgroundColor: bgCol[index % lngth],
        borderColor: bgCol[index % lngth],
        skipNull: true,
      }
    })
    dataJson.datasets = datasetsMod;
    //console.log('dataJson=', dataJson);
    //
    setCommGraphData(dataJson);
    setFlgCommGraphDataLoaded(true);
  }
  // -------------------------------------
  
  // chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y: {
        suggestedMin: 0
      }
    }
  };
  // -------------------------------------
  const RefreshData = async () => {
    datesSetupOther();
    fetchCommonGraphs();
    fetchIndividualgraphs();
  }

  useEffect( () => {
    document.title = "WA3: Analytics";
  },[])

  useEffect( () => {
    if (storeDF !== '' && storeDT !== '') {
      setDateFrom(storeDF);
      setDateTo(storeDT);      
    }
  },[storeDF, storeDT])

  useEffect( () => {
    if (dateFrom !== '' && dateTo !== '') {
      RefreshData();
    }
  },[dateFrom, dateTo])
  

  // --------------------------------------
  return (
    <>
      <Navigation/>
      <hr/>       
      
      <h2>Controls</h2>
      <button type="button" onClick={RefreshData}>Refresh </button> <br/>
      <br />

      <div>
        <div>from <b>{dateFrom}</b> to <b>{dateTo}</b></div>

        <div className='datediv_wrapper'>
          <div className='dateDiv'>Date from:</div> 
          <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value) }} /> 
        </div>

        <div className='datediv_wrapper'>
          <div className='dateDiv'>Date to:</div> 
          <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value) }} /> 
        </div>
      </div>

      

      <hr/>


      <h2>Activities charts (alltogether)</h2>
      {/*<div>{JSON.stringify(commGraphData)}</div>*/}
      { (FlgCommGraphDataLoaded && commGraphData !== '') 
        ? <> <Chart type='bar' options={options} data={commGraphData} /> </> 
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
      <div className='ul-charts'>
        {/**/
          (flgIndivGraphDataLoaded && indivGraphData.length >0)
          ? <>
          { indivGraphData.map( (item) => {
            return <ModBarChart key={item.chart_name_id}
                type={typeSelected}
                chartName={item.chart_name}
                labels={item.labels}
                datasets={item.data}
                data2={item.data2}
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

