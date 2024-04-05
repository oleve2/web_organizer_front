
import { FC, useState, useEffect } from "react";

// models
import { ActivityLogModel } from "@/models/models";


interface FormEditActivLogProps {
  itemEditActivLog: ActivityLogModel,
  handleCloseEditActivLog: () => void,
  handleUpdateActivLog: (dataObj: ActivityLogModel) => void,
}


const FormEditActivLog:FC<FormEditActivLogProps> = (props) => {

  const [form_activ_name_id, setForm_activ_name_id] = useState<number>(props.itemEditActivLog.activ_name_id!);
  const [form_activ_norm_id, setForm_activ_norm_id] = useState<number>(props.itemEditActivLog.activ_norm_id!);
  const [form_activ_date, setForm_activ_date]       = useState<string>(props.itemEditActivLog.activ_date);
  const [form_activ_value, setForm_activ_value]     = useState(props.itemEditActivLog.activ_value);

  const clickUpdateActivLog = () => {
    let dataObj: ActivityLogModel = {
      id:             Number(props.itemEditActivLog.id),
      activ_name_id:  Number(form_activ_name_id), 
      activ_norm_id:  Number(form_activ_norm_id), 
      activ_date:     form_activ_date,
      activ_value:    Number(form_activ_value)
    }
    //console.log('updating dataObj=', dataObj);
    props.handleUpdateActivLog(dataObj);
  }

  useEffect( () => {
    setForm_activ_name_id(props.itemEditActivLog.activ_name_id!);
    setForm_activ_norm_id(props.itemEditActivLog.activ_norm_id!);
    setForm_activ_date(props.itemEditActivLog.activ_date);
    setForm_activ_value(props.itemEditActivLog.activ_value);
  },[props.itemEditActivLog])


  return (
    <div className='temp-block'>
      {JSON.stringify(props.itemEditActivLog)}
      <h4>Edit ActivLog: (id={props.itemEditActivLog.id})</h4>
      <label>activ_name_id</label> 
      <input value={form_activ_name_id} onChange={(e) => {setForm_activ_name_id(Number(e.target.value))}}/> <br/>

      <label>activ_norm_id</label> 
      <input value={form_activ_norm_id} onChange={(e) => {setForm_activ_norm_id(Number(e.target.value))}}/> <br/>

      <label>activ_date</label> 
      <input type="date" value={form_activ_date} onChange={(e) => {setForm_activ_date(e.target.value)}}/> <br/>

      <label>activ_value</label> 
      <input value={form_activ_value} onChange={(e) => {setForm_activ_value(Number(e.target.value))}}/> <br/>
      
      <button type="button" onClick={clickUpdateActivLog}>Update ActivLog</button> | 
      <button type="button" onClick={props.handleCloseEditActivLog}>Close</button>
    </div>    
  )
}

export default FormEditActivLog;