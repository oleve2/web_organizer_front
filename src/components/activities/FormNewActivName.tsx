import { FC, useState } from "react";

// models
import { ActivityModel } from '@/models/models';

interface FormNewActivNameProps {
  handleSaveNewActivName: (val: ActivityModel) => void,
  handleIsNewActName: (val: boolean) => void,
}

//
const FormNewActivName:FC<FormNewActivNameProps> = (props) => {
  // new ActivName items
  const [formAN_name, setFormAN_name] = useState('');
  const [formAN_date_start, setFormAN_date_start] = useState('');
  const [formAN_date_end, setFormAN_date_end] = useState('');
  const [formAN_norm_id, setFormAN_norm_id] = useState('');

  const clickSave = () => {
    let dataObj: ActivityModel = {
      id: 0,
      name: formAN_name, 
      date_start: formAN_date_start, 
      date_end: formAN_date_end,
      norm_id: Number(formAN_norm_id)
    }
    props.handleSaveNewActivName(dataObj) 
    //
    setFormAN_name('');
    setFormAN_date_start('');
    setFormAN_date_end('');
    setFormAN_norm_id('');    
  }

  return (
    <div className='temp-block'>
      <h4>New Activity Name</h4>

      <label>name</label> 
      <input value={formAN_name} onChange={(e) => {setFormAN_name(e.target.value)}}/> <br/>

      <label>date_start</label> 
      <input type="date" value={formAN_date_start} onChange={(e) => {setFormAN_date_start(e.target.value)}}/> <br/>

      <label>date_end</label> 
      <input type="date" value={formAN_date_end} onChange={(e) => {setFormAN_date_end(e.target.value)}}/> <br/>

      <label>norm_id</label> 
      <input value={formAN_norm_id} onChange={(e) => {setFormAN_norm_id(e.target.value)}}/> <br/>

      <button type="button" onClick={clickSave} >Save new activName</button> | 

      <button type="button" onClick={() => { props.handleIsNewActName(false) } }>Close</button>
    </div>
  )
}

export default FormNewActivName;
