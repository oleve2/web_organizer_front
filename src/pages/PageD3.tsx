import {FC, useState } from 'react';
import Navigation from '../components/layout/Navigation';

// components
import D3BarChart from '../components/galeryD3/d3BarChart';
import D3BarChartZoomable from '../components/galeryD3/d3BarChartZoomable';
import D3LineChart from '../components/galeryD3/d3LineChart';

import { LGDTp } from '../models/modelsd3';

interface PageD3Props {}

//
const PageD3:FC<PageD3Props> = (props) => {
  const [data_bar1, set_data_bar1] = useState([12, 5]);

  interface LGDTp {date: number, value: number}
  const lineGraphData: LGDTp[] = [
    {date:2014,value:0},
    {date:2015,value:24},
    {date:2016,value:40.8},  
    {date:2017,value:49.25},
    {date:2018,value:62},
    {date:2019,value:81},
    {date:2020,value:87.5},
    {date:2021,value:64.25},
    {date:2022,value:42.8},
    {date:2023,value:30.75},
  ];

  const doAddBar1Point = () => {
    let tmp = [...data_bar1];
    tmp.push(Math.random()* 10);
    set_data_bar1(tmp);
  }

  const doResetPoints = () => {
    set_data_bar1([5,5,4]);
  }


  return (
    <>
    <Navigation />
    <hr />

    <h2>Some D3 shit coming up ...</h2>

    <div style={{border:"1px solid blue", margin:"20px 0px"}}>
      <h3>1) some basic bar chart (static)</h3>
      <button onClick={doAddBar1Point}>add data point</button>  | <button onClick={doResetPoints}>reset points</button> <br />
      <D3BarChart data={data_bar1} />
    </div>

    <div style={{border:"1px solid blue", margin:"20px 0px"}}>
      <h3>2) bar chart with zoom</h3>
      <D3BarChartZoomable />
    </div>

    <div style={{border:"1px solid blue", margin:"20px 0px"}}>
      <h3>3) line chart with tooltip</h3>
      <D3LineChart 
        data={lineGraphData}
      />
    </div>

    </>
  )
}

export default PageD3;
