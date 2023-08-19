import { FC, useEffect, useRef} from 'react';

import * as d3 from 'd3';

interface D3BarChartProps {
  data: number[],
}

// remove to redraw
// https://stackoverflow.com/questions/22382984/deleting-d3-svg-elements-for-redraw

// !!!!!!!!! очень вменяемые примеры https://ncoughlin.com/posts/d3-react/


const D3BarChart:FC<D3BarChartProps> = (props) => {
  const containerRef = useRef(null);

  //let svg = d3.select(svgRef.current)

  const update = () => {
    const svg = d3.select(containerRef.current)
      //.append("svg")
      .attr("width", '100%')
      .attr("height", 300);
    
    // clear all previous content on refresh
    const everything = svg.selectAll("*")
    everything.remove();

    const container = svg.append("g");

    container.selectAll("rect")
      .data(props.data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");    
  }

  useEffect( () => {
    update();
  },[props.data, containerRef.current]) //, 

  //
  return (
    <div>
      <svg ref={containerRef}></svg>
    </div>
  )
}

export default D3BarChart;
 