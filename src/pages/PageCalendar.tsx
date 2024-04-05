import { FC, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 

import { AppDispatch, RootState  } from "@/rtkstore/store";
import { actionsCalendRed } from "@/rtkstore/calendarReducer";

// components
import Navigation from "@/components/layout/Navigation";
import CalendardMini from "@/components/calendar/CalendarMini";
import CalendardFull from "@/components/calendar/CalendarFull";
import CalendarItemsTable from "@/components/calendar/CalendarItemsTable";

// models
import { CalendarMode } from "@/models/models";

// styles
import spc from './PageCalendar.module.css';

interface PageCalendarProps {}


const PageCalendar:FC<PageCalendarProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  // store
  const {
    today, 
    grid,
    calendMode,
  } = useSelector( (store: RootState) => ({
    today: store.calendarReducer.today ,
    grid: store.calendarReducer.arrCalendarItems,
    calendMode: store.calendarReducer.calendMode,
  }))

  const [num_of_rows, set_num_of_rows] = useState(grid.length);
  const calendModeOptions = Object.values(CalendarMode);

  const doSelectCakendMode = (val: CalendarMode) => {
    dispatch( actionsCalendRed.set_calendMode(val) );
  }

  useEffect( () => {
    document.title = "WA3: Calendar";
  }, [])

  useEffect( () => {
    set_num_of_rows(grid.length);
  },[grid])


  return (
    <>
    <Navigation />
    <hr />

    <h2>This is PageCalendar</h2>
    
    <div className={spc.calendar_container}>
      <div className={spc.calendar_Div}>
        <CalendardMini 
          currDate={today}
          num_of_rows={num_of_rows}
          grid={grid}
        />
      </div>

      <div className={spc.calendar_Div}>
        <div className={spc.modeToggler}>
          { calendModeOptions.map( (item) => {
            return <div key={item} 
              className={(item === calendMode) ? spc.modeToggler__item + " " + spc.modeToggler__itemActive : spc.modeToggler__item} 
              onClick={() => { doSelectCakendMode(item) }}
              >{item}</div>
          }) }
        </div>
        
        { calendMode === CalendarMode.calendar && 
          <CalendardFull 
            currDate={today}
            num_of_rows={num_of_rows}
            grid={grid}
          />
        }

        { calendMode === CalendarMode.list &&
          <CalendarItemsTable />
        }

      </div>
    </div>    
     

    </>
  )
}

export default PageCalendar;
