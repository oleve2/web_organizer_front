import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// models
import { CalendarData, CalendTaskStatus } from "../../models/models"; 

// store
import { AppDispatch, RootState } from "../../rtkstore/store";
import { insertCelendarItem, updateCelendarItem, deleteCelendarItem, fetchCalendarGrid } from "../../rtkstore/calendarReducer";

// style
import s from './CalendarCard.module.css';

interface CalendarItemPopupCardProps {
  isCreateNew: boolean,
  header_text: string,
  doClose: () => void,
}

//
const CalendarItemPopupCard:FC<CalendarItemPopupCardProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const doSaveCalendarItem = () => {
    if (props.isCreateNew) {
      // create
      let dIns: CalendarData = {
        id:0, date: form_date, name: form_name, time_from: form_time_from, 
        time_to: form_time_to, status: form_status
      };
      dispatch( insertCelendarItem(dIns) );
    }
    if (!props.isCreateNew) {
      // update
      let dUpd: CalendarData = {
        id:calendarItem.id, date: form_date, name: form_name, time_from: 
        form_time_from, time_to: form_time_to, status: form_status
      };
      dispatch( updateCelendarItem(dUpd) );
    }
    props.doClose();
    dispatch( fetchCalendarGrid({}) );    
  }

  const doDeleteItem = () => {
    dispatch( deleteCelendarItem(calendarItem.id) );
    props.doClose();
    dispatch( fetchCalendarGrid({}) );        
  }


  // store
  const {
    calendarItem,
  } = useSelector( (store: RootState) => ({
    calendarItem:   store.calendarReducer.calendarItemActive,
  }))

  //const dispatch = useDispatch<AppDispatch>();
  const CalTaskTypeArr: string[] = Object.keys(CalendTaskStatus);

  const [isEdit, set_isEdit] = useState<boolean>(false);

  const [form_date, set_form_date] = useState<string>(calendarItem.date);
  const [form_name, set_form_name] = useState<string>(calendarItem.name);
  const [form_time_from, set_form_time_from] = useState<string>(calendarItem.time_from);
  const [form_time_to, set_form_time_to] = useState<string>(calendarItem.time_to);
  const [form_status, set_form_status] = useState<string>(calendarItem.status);


  return (
    <div className={s.calcard_wrapper}>
      <h3>{props.header_text} | isCreateNew={JSON.stringify(props.isCreateNew)}</h3>
      
      <button onClick={() => { set_isEdit(!isEdit) }}>Edit {JSON.stringify(isEdit)}</button> 
      |  
      <button onClick={doDeleteItem}>Delete</button>
      <br /><br />
      
      {/* <div>{JSON.stringify(calendarItem)}</div>*/}
      <br />
      
      { (isEdit || props.isCreateNew)
      ? <div>
          <div>id: #{calendarItem.id}</div>
          <div>date:</div>
          <input type="date" value={form_date} onChange={(e) => { set_form_date(e.target.value) }}/>
          <br/><br/>

          <div>time_from:</div>
          <input type="text" value={form_time_from} onChange={(e) => { set_form_time_from(e.target.value) }}/>
          <br/><br/>

          <div>time_to:</div>
          <input type="text" value={form_time_to} onChange={(e) => { set_form_time_to(e.target.value) }}/>
          <br/><br/>

          <div>status</div>
          <select name="calendtask_status" onChange={ (e) => { set_form_status(e.target.value) }}>
            { CalTaskTypeArr.map( (item) => {
              return (item === form_status) 
                ? <option key={item} selected={true} value={item}>{item}</option> 
                : <option key={item} value={item}>{item}</option> 
            }) }
          </select>
          <br/><br/>

          <div>name:</div>
          <textarea style={{width:"200px", height:"50px"}}  value={form_name} onChange={ (e) => { set_form_name(e.target.value) }}>
          </textarea>
          <br/><br/>

          <button onClick={doSaveCalendarItem}>Save changes</button>
      </div> 
      : <div>
          <div>id: #{calendarItem.id}</div>
          <br/>
          <div>date: {calendarItem.date}</div> 
          <br/>
          <div>name: {calendarItem.name}</div> 
          <br/>
          <div>time_from: {calendarItem.time_from}</div> 
          <br/>
          <div>time_to: {calendarItem.time_to}</div> 
          <br/>
          <div>status: {calendarItem.status}</div>
      </div>
      }
      
      <br /><br />
      <button onClick={props.doClose}>Close the form</button>
    </div>
  )
}

export default CalendarItemPopupCard;
