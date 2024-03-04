import { FC, useState } from "react";

// components
import CalendarRow from "./CalendarRow";
import CalendarItemPopupCard from "./CalendarItemPopupCard";

// models
import { RowPlacement, CalendarItemR } from "../../models/models"; 

interface CalendardMiniProps {
  currDate: string,
  num_of_rows: number,
  grid: CalendarItemR[][],
}

const CalendardMini:FC<CalendardMiniProps> = (props) => {
  const arrNumOfRows = Array.from(Array(props.num_of_rows).keys());
  const [isNewActive, set_isNewActive] = useState<boolean>(false);

  return (
    <div>
      <h2>Calendar mini</h2>

      { isNewActive && <CalendarItemPopupCard 
        isCreateNew={true}
        header_text="New CalendarItem"
        doClose={() => { set_isNewActive(false) }}
      /> }

      <div>
        { arrNumOfRows.map( (item, index) => {
        return <CalendarRow key={index} 
          currDate={props.currDate}
          where={RowPlacement.mini}
          items={props.grid[item]}
          num={item}
        />
        }) }
      </div>

      <button style={{width:"fit-content", marginTop:"40px"}}
        onClick={() => { set_isNewActive(!isNewActive) }}
      >create new event</button>
    </div>
  )
}

export default CalendardMini;
