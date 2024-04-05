import { FC, useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';

// https://react-chartjs-2.js.org/examples/doughnut-chart
// https://github.com/reactchartjs/react-chartjs-2/issues/654

/*
  props.chartName
  props.labels
  props.datasets
*/

// models
import { Data2Model } from '@/models/models';

interface ModBarChartProps {
  type: string,
  chartName: string,
  labels: string[],
  datasets: number[],
  data2: Data2Model,
  f1: string,
}

interface DataForMBC {
  labels: string[],
  datasets: Data2Model[]
}


const ModBarChart:FC<ModBarChartProps> = (props) => {
  const [dataM, setDataM] = useState<DataForMBC>({
    labels:[], datasets: []});
  const [ready, setReady] = useState<boolean>(false);
  
  // options
  const options: any = {
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
    /*if (props.f1 === 'val') {
      setDataM({labels: props.labels[0], datasets: props.datasets[0]})
    } */
    if (props.f1 === 'api') {
      setDataM({labels: props.labels, datasets: [props.data2]})      
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
              ? <Chart type='bar' options={options} data={dataM} />
              : <></>
            }
            { props.type === 'line' 
              ? <Chart type='line' options={options} data={dataM} />
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

export default ModBarChart;
