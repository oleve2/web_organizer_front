import { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';

// https://react-chartjs-2.js.org/examples/doughnut-chart
// https://github.com/reactchartjs/react-chartjs-2/issues/654

/*
  props.chartName
  props.labels
  props.datasets
*/

export default function ModBarChart(props) {
  const [data, setDataM] = useState({});
  const [ready, setReady] = useState(false);
  
  // options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: props.chartName,
      },
    },
    scales: {
      y: {
        suggestedMin: 0
      }
    }
  };

  useEffect( () => {
    if (props.f1 === 'val') {
      setDataM({
        labels: props.labels[0],
        datasets: props.datasets[0]
      })
    } else {
      setDataM({
        labels: props.labels,
        datasets: [props.data2]
      })      
    };
    setReady(true);
  }, [props.data2, props.datasets, props.f1, props.labels])


  // -------------------------------------
  return (
    <>
      { (ready) 
        ? <>
          {/**/}
          {/*<div>inside:{JSON.stringify(props)}</div>*/}
          
          <div className='bar2'>
            { props.type === 'bar' 
              ? <Chart type='bar' options={options} data={data} />
              : <></>
            }
            { props.type === 'line' 
              ? <Chart type='line' options={options} data={data} />
              : <></>
            }
            {/* props.type === 'pie' 
              ? <Chart type='pie' options={options} data={data} />
              : <></>
            */}
          </div>        
        </> 
        : <></> 
      }
    </>
  )  

}

