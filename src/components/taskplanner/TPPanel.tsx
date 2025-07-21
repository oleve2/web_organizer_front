import { FC, useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Xwrapper } from "react-xarrows";
import { useXarrow } from "react-xarrows";

// components
import TPTable from "./TPTable";
import Arrow from "./Arrow";

// hooks
import useWindowDimensions from "@/hooks/useWindowDimensions";

// data
import { data } from "./taskplanner_data";

//
const TPTanel:FC = (props) => {
  const {width, height} = useWindowDimensions();
  const [isMoveable, set_isMoveable] = useState<boolean>(false);
  const updateXarrow = useXarrow();

  const onDrag = () => {
    set_isMoveable(true);
    updateXarrow();
  }

  const onStop = (e: any) => {
    //let rect = e.target.getBoundingClientRect();
    //console.log(rect.x, rect.y);
    set_isMoveable(false);
    updateXarrow();
  }

  return (
    <>
      <TransformWrapper 
        initialScale={1}
        disabled={isMoveable}
        minScale={.2}
        maxScale={5}
        limitToBounds={false}
        onPanning={updateXarrow}
        onZoom={updateXarrow}
        pinch={{ step:5 }}
      >
        <TransformComponent wrapperStyle={{ height: height, width: width }}>
          <div style={{border:"1px solid blue"}}>
          { data.schema.map( (item, index) => {
            return <TPTable key={index} 
              name={item.name} 
              att={item.att} 
              coord={item.coord}
              onDrag={onDrag}  
              onStop={onStop} 
            />
          }) }
          </div>

        </TransformComponent>

        <Xwrapper>
          { data.rel.map( (rel, index) => {
            return <Arrow key={index} head={rel.head} tail={rel.tail} />
          }) }
        </Xwrapper>
      </TransformWrapper>
    </>
  )
}

export default TPTanel;
