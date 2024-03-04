import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TCTagModel } from '../../models/models';

// store
import { updateOneTCTag, fetchTCTags } from '../../rtkstore/tagCloudReducer';
import { AppDispatch } from '../../rtkstore/store';

interface TCFormEditprops {
  tagToEdit: TCTagModel,
  funcCloseForm: () => void,
}

const TCFormEdit:FC<TCFormEditprops> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formName, setformName] = useState(props.tagToEdit.name);
  const [formColor, setformColor] = useState(props.tagToEdit.color);

  const handleEditTag = () => {
    let editTag: TCTagModel = {
      id: props.tagToEdit.id,
      name: formName,
      color: formColor,
    }
    //console.log('editTag=', editTag);
    // 
    dispatch( updateOneTCTag(editTag) );
    // 
    setformName('');
    setformColor('');
    // 
    dispatch( fetchTCTags({}) );
    props.funcCloseForm();
  }


  return (<div style={{border:'1px solid black', width:'fit-content', padding:'10px'}}>
    <h4>Edit tag #{props.tagToEdit.id}</h4>
    
    <div>
      {/*JSON.stringify(props.tagToEdit)
      <br />*/}

      <label>Name</label>
      <input type="text" value={formName}
        onChange={(e) => {setformName(e.target.value)}}
      />  
      <br /><br /> 

      <label>Color</label>
      <input type="text" value={formColor}
        onChange={(e) => {setformColor(e.target.value)}}
      />        
    </div>
    <br />

    <button type="button" onClick={handleEditTag}>Save changes</button>
    <button type="button" onClick={props.funcCloseForm}>Close</button>    
  </div>)
}

export default TCFormEdit;
