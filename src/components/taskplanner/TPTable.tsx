import { FC, useState } from "react";

import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

import { IRowProps } from "@/models/models_taskplanner";

import s from './TPTable.module.css';


interface ITableProps {
  name: string,
  att: IRowProps[],
  coord: {x: number, y: number},
  onDrag: () => void,
  onStop: (e: any)=> void,  
}

//
const TPTable:FC<ITableProps> = (props) => {
  const [pos, set_pos] = useState({x: props.coord.x, y: props.coord.y});

  const trackPos = (data: any) => {
    set_pos({x: data.x, y: data.y})
  }

  return (
    <Draggable 
      defaultPosition={{x: pos.x, y: pos.y}}
      onStop={props.onStop} 
      onDrag={ (e, data) => {
        trackPos(data);
        props.onDrag();
      }}
    >
      <div id={"block-" + props.name} style={{position:'absolute'}}> 
        <h3>{props.name} x={pos.x} y={pos.y}</h3>
        <div></div>
        {props.att.map( (value, index) => {
          return <div key={index} id={props.name + "." + value.name} className={s.ptp_element} >
            <div><h3>{value.name}</h3></div>
            <div><h3>{value.type}</h3></div>
            <div><h3>{value.null}</h3></div>
            <div>{ (value.pk) ? <h3>pk</h3> : null}</div>
          </div>
        })}
      </div>
    </Draggable>
  )
}

export default TPTable;
