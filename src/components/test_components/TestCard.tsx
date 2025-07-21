import { FC, useState } from "react";
import Draggable from "react-draggable";

interface TestCardProps {
  name: string,
  xstart: number,
  ystart: number,
}


const TestCard:FC<TestCardProps> = (props) => {
  const [pos, set_pos] = useState({x: props.xstart, y: props.ystart});

  const trackPos = (data: any) => {
    set_pos({x: data.x, y: data.y})
  }

  return <>
    <Draggable 
      defaultPosition={{x: pos.x, y: pos.y}} 
      onDrag={(e, data) => { trackPos(data) }}
    >
      <div style={{border:"1px solid black", padding:"20px", width:"250px", position:'absolute'}}>
        <div>{props.name}</div>
        <div>rel: x={pos.x} y={pos.y}</div>
      </div>
    </Draggable>
  </>
}

export default TestCard;
