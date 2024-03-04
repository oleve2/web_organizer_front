
import { FC, useState } from "react";

// models
import { ActivityLogModel } from '../../models/models';

/* props:
  - handleSaveNewActiv
*/
//

interface FormNewActivLogProps {
  handleSaveNewActivLog: (dataObj: ActivityLogModel) => void,
  handleIsNewActivLog: (val: boolean) => void,
}

//
const FormNewActivLog:FC<FormNewActivLogProps> = (props) => {
  const [form_activ_name_id, setForm_activ_name_id] = useState('');
  const [form_activ_norm_id, setForm_activ_norm_id] = useState('');
  const [form_activ_date, setForm_activ_date]       = useState('');
  const [form_activ_value, setForm_activ_value]     = useState('');

  const clickSave = () => {
    let dataObj: ActivityLogModel = {
      id: 0,
      activ_name_id: Number(form_activ_name_id), 
      activ_norm_id: Number(form_activ_norm_id), 
      activ_date: form_activ_date,
      activ_value: Number(form_activ_value)
    }
    props.handleSaveNewActivLog(dataObj);
    //
    setForm_activ_name_id('');
    setForm_activ_norm_id('');
    setForm_activ_date('');
    setForm_activ_value('');  
  }

  return (
    <div className='temp-block'>
      <h4>New ActivLog</h4>
      <label>activ_name_id</label> 
      <input value={form_activ_name_id} onChange={(e) => {setForm_activ_name_id(e.target.value)}}/> <br/>

      <label>activ_norm_id</label> 
      <input value={form_activ_norm_id} onChange={(e) => {setForm_activ_norm_id(e.target.value)}}/> <br/>

      <label>activ_date</label> 
      <input type="date" value={form_activ_date} onChange={(e) => {setForm_activ_date(e.target.value)}}/> <br/>

      <label>activ_value</label> 
      <input value={form_activ_value} onChange={(e) => {setForm_activ_value(e.target.value)}}/> <br/>

      <button type="button" onClick={clickSave}>Save new activ</button> | 
      <button type="button" onClick={() => { props.handleIsNewActivLog(false) } }>Close</button>
    </div>
  )
}

export default FormNewActivLog;
