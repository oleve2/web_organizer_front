import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import CalendarRow from "./CalendarRow";
import CalendarItemPopupCard from "./CalendarItemPopupCard";

// store 
import { AppDispatch, RootState } from "@/rtkstore/store";
import { actionsCalendRed, calDataEmpty } from "@/rtkstore/calendarReducer";
import { fetchCalendarGrid } from "@/rtkstore/calendarReducer"; 


// models
import { RowPlacement, CalendarItemR } from "@/models/models";


interface CalendardFullProps {
  currDate: string,
  num_of_rows: number,
  grid: CalendarItemR[][],
}

const CalendardFull:FC<CalendardFullProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const arrNumOfRows = Array.from(Array(props.num_of_rows).keys());
  const [isReg, set_isReg] = useState<boolean>(false)

  // store
  const {
    isCalendarFormActive,
    YearMonth,
  } = useSelector( (store: RootState) => ({
    isCalendarFormActive: store.calendarReducer.isCalendarFormActive,
    YearMonth:         store.calendarReducer.YearMonth,
  }))


  const doCloseEditCI = () => {
    dispatch(actionsCalendRed.set_calendarItem(calDataEmpty));
    dispatch(actionsCalendRed.set_isCalendarFormActive(false));
  }

  const doClickFetchButton = () => {
    dispatch( fetchCalendarGrid({}) );
  }

  const changeYearMonth = (val: string) => {
    dispatch( actionsCalendRed.set_YearMonth(val) )
  }

  useEffect( () => {
    // проверяем YearMonth на формат YYYY-MM и если да - делаем запрос
    let reg = /^^\d{4}-\d{2}$/
    if (reg.test(YearMonth)) {
      dispatch( fetchCalendarGrid({}) );
    }

  }, [YearMonth])


  return (
    <div>
      <h2>Calendar full</h2>

      { isCalendarFormActive && <CalendarItemPopupCard 
        isCreateNew={false}
        header_text="Update CalendarItem"
        doClose={doCloseEditCI}
      /> }

      <div style={{display:"flex"}}>
        <div>year_month:</div> 
        <input type="text" value={YearMonth} onChange={(e) => { changeYearMonth(e.target.value) }}/>
        <button onClick={doClickFetchButton}>Fetch + Refresh</button>
      </div>
      <br/>
      
      <div>today: {props.currDate}</div>
      <br/>
              
      <div>
        { arrNumOfRows.map( (item, index) => {
          return <CalendarRow key={index} 
            currDate={props.currDate}
            where={RowPlacement.full}
            items={props.grid[item]}
            num={item}
          />
        }) }
      </div>
     
    </div>
  )
}

export default CalendardFull;
