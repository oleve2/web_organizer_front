import React, { FC, useRef } from "react";
import Draggable from "react-draggable";

// components
import Navigation from "../components/layout/Navigation";
import TestCard from "../components/test_components/TestCard";


const PageTests:FC = (props) => {
  const params = [
    {x: 0, y: 0, name:"0-0 zero ground"},
    {x: 150, y: 50, name:"150-50 drag me baby"},
    {x: 300, y: 300, name:"300-300 second MF"},
  ]


  return ( <>
    <Navigation />
    <hr />  
    <div>PageTests</div>

    <div style={{border:"1px solid blue", position:'relative'}}>
      { params.map( (item, index) => {
      return <TestCard key={index} 
        name={item.name} 
        xstart={item.x} 
        ystart={item.y}
      />
      }) }
    </div>
  </>
  )
}

export default PageTests;
