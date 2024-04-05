import { FC } from "react";

// models
import { CalendarData, CalendTaskStatus } from "@/models/models"; 

// store
// store
import { /*useSelector,*/ useDispatch } from "react-redux"; 
import { AppDispatch/*, RootState*/ } from "@/rtkstore/store";
import { actionsCalendRed } from "@/rtkstore/calendarReducer";

// style
import s from './CellFull.module.css';

interface CellFullProps {
  item: CalendarData,
}

const CellFull:FC<CellFullProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();  

  const doTheClick = () => {
    dispatch(actionsCalendRed.set_calendarItem(item)); 
    dispatch(actionsCalendRed.set_isCalendarFormActive(true)); 
  }

  const item = props.item;
  
  const calcItemStyles = (item: CalendarData) => {
    if (item.status === CalendTaskStatus.canceled) {
      return s.cellfull_div + " " + s.cancelled;
    } else if (item.status === CalendTaskStatus.done) {
      return s.cellfull_div + " " + s.done;
    } else {
      return s.cellfull_div;
    }
  }


  return (
    <div className={calcItemStyles(item)} onClick={doTheClick}>
      <div>{item.time_from}-{item.time_to}</div>
      <div>{item.name.slice(0,12)+"..."}</div>  
    </div>   
  )
}

export default CellFull;
