import { FC } from "react";

// styles
import s from './CalendarRow.module.css';

// components
import CellFull from "./CellFull";

// models
import { RowPlacement, CalendarItemR } from "@/models/models"; 


interface CalendarRowProps {
  currDate: string,
  num: number,
  items: CalendarItemR[],
  where: RowPlacement,
}

const CalendarRow:FC<CalendarRowProps> = (props) => {
  return (
    <div>
      {/* JSON.stringify(props) */}

      { props.where === RowPlacement.mini && props.items !== undefined &&
        <div style={{display:"flex"}}>
          { [...Array(7)].map( (el, idx) => {
            let d_day = props.items[idx].item_id.split('-')[2];
            return <div key={idx} 
              className={ props.currDate === props.items[idx].item_id
                ? s.cell_mini + " " + s.cell_current 
                : s.cell_mini}
              >{d_day}</div>
          }) }
        </div>
      }

      { props.where === RowPlacement.full && props.items !== undefined &&
        <>
        <div style={{display:"flex"}}>
          { [...Array(7)].map( (el, idx) => {
            let pdata = props.items[idx].data;
            return <div key={idx} 
              className={ props.currDate === props.items[idx].item_id ? s.cell_full + " " + s.cell_current : s.cell_full }
              >
                <div>{props.items[idx].item_id}</div>
                { pdata !== null && <>
                    { pdata.map( (item, idx) => { 
                      return <CellFull key={item.date+"-"+idx}
                        item={item}
                      />
                    }) }
              
                  </>
                }
              </div>
          }) }
        </div>      
        </>
      }
    </div>
  )
}

export default CalendarRow;
