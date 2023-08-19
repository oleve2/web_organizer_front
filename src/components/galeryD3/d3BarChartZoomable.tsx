import {FC, useRef, useEffect} from 'react';

import * as d3 from 'd3';

interface D3BarChartZoomableProps {}

// (!!!!!!!!)
// https://stackoverflow.com/questions/55963129/error-type-number-undefined-is-not-assignable-to-type-number-valueof
// https://stackoverflow.com/questions/75571786/type-issues-with-d3js 

const D3BarChartZoomable:FC<D3BarChartZoomableProps> = (props) => {
  const containerRef = useRef(null);

  const update = () => {
    // variables and functions
    let width = window.innerWidth - 100; //1000;
    let height = 500;
    let margin = {top: 20, right: 0, bottom: 30, left: 40}

    // data + sorting
    let data_orig = [{"name":"E","value":0.12702},{"name":"T","value":0.09056},{"name":"A","value":0.08167},{"name":"O","value":0.07507},{"name":"I","value":0.06966},{"name":"N","value":0.06749},{"name":"S","value":0.06327},{"name":"H","value":0.06094},{"name":"R","value":0.05987},{"name":"D","value":0.04253},{"name":"L","value":0.04025},{"name":"C","value":0.02782},{"name":"U","value":0.02758},{"name":"M","value":0.02406},{"name":"W","value":0.0236},{"name":"F","value":0.02288},{"name":"G","value":0.02015},{"name":"Y","value":0.01974},{"name":"P","value":0.01929},{"name":"B","value":0.01492},{"name":"V","value":0.00978},{"name":"K","value":0.00772},{"name":"J","value":0.00153},{"name":"X","value":0.0015},{"name":"Q","value":0.00095},{"name":"Z","value":0.00074}]
    let data = data_orig.sort((a,b) => {
      if (a.name > b.name) {return 1}
      if (a.name < b.name) {return -1}
      return 0;
    })

    //
    const yAxis = (g: any) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call( (g: any) => g.select(".domain").remove())
    
    const xAxis = (g: any) => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number]).nice()
      .range([height - margin.bottom, margin.top])
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    //
    function zoom(svg:any) {
      const extent:[[number, number], [number, number]] = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
    
      svg.call(d3.zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed));
    
      function zoomed(event: any) {
        x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
        svg.selectAll(".bars rect").attr("x", (d:any) => x(d.name)).attr("width", x.bandwidth());
        svg.selectAll(".vals").attr("x", (d:any) => x(d.name)).attr("width", x.bandwidth());
        svg.selectAll(".x-axis").call(xAxis);
      }
    }


    //
    const svg = d3.select(containerRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

    // clear all previous content on refresh
    const everything = svg.selectAll("*")
    everything.remove();

    const container = svg.append("g");

    // create tooltip element  
    const tooltip = d3.select("body")
      .append("div")
      .attr("class","d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");


    // drawing
    container.append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr('class', 'group')
      .attr("x", d => x(d.name)!)
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      
      // events
      .on("mouseover", function(i, d) {
        tooltip
          .html(`${d.value}`)
          .style("visibility", "visible"); 
        d3.select(this).attr("fill", 'red');
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY-10)+"px")
          .style("left",(event.pageX+10)+"px");
      })
      .on("mouseout", function() {
        tooltip.html(``).style("visibility", "hidden");
        d3.select(this).attr("fill", 'steelblue');
      });

    //
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);  

  }

  useEffect( ()=> {
    update();
  }, [containerRef.current]) //props.data, 



  return (
    <div>
      <svg ref={containerRef}></svg>
    </div>
  )
}

export default D3BarChartZoomable;
