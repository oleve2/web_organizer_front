import {FC, useRef, useEffect} from 'react';

import * as d3 from 'd3';

import { LGDTp } from '../../models/modelsd3';

interface D3LineChartProps {
  data: LGDTp[],
}

// !!! https://stackoverflow.com/questions/43990667/typescript-line-chart-d3


//
const D3LineChart:FC<D3LineChartProps> = ({data}) => {
  const containerRef = useRef(null);

  const update = () => {
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    // set the ranges
    //const xScale = d3.scaleTime().range([0, width]);
    //const yScale = d3.scaleLinear().range([height, 0]);

  
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select(containerRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    

    // clear all previous content on refresh
    const everything = svg.selectAll("*")
    everything.remove();
    
    const xScale = d3.scaleLinear()
      .domain([Math.min(...data.map( d => d.date)), Math.max(...data.map( d => d.date))])
      .range([margin.left, width - margin.right])
    
    const yScale = d3.scaleLinear()
      .domain([Math.min(...data.map( d => d.value)), Math.max(...data.map( d => d.value))])
      .range([height - margin.bottom, margin.top])

    
    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    const line = d3.line<LGDTp>()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.value); });

    // Add the valueline path.
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)    
      .data([data])
      .attr("class", "line")
      .attr("d", line);

  }

  useEffect( () => {
    update();
  }, [data, containerRef.current])

  return (
    <div>
      <svg ref={containerRef} style={{border:'1px solid green'}}></svg>
    </div>
  )
}

export default D3LineChart;
