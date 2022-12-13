import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

// models
import { TCTagModel } from '../../models/models';

// store
import { insertOneTCTag, fetchTCTags } from '../../rtkstore/tagCloudReducer';
import { AppDispatch } from '../../rtkstore/store';


interface TCFormNewProps {
  funcCloseForm: () => void,
}

//
const TCFormNew:FC<TCFormNewProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [newTagName, setnewTagName] = useState<string>('');
  const [newTagColor, setnewTagColor] = useState<string>('');

  const handleAddTagNew = () => {
    let newTag: TCTagModel = {
      id: 0, 
      name: newTagName,
      color: newTagColor,
    };
    //console.log('newTag=', newTag);
    // do fetch to save data to server
    dispatch( insertOneTCTag(newTag) );
    // clear form
    setnewTagName('');
    setnewTagColor('');
    // re-fetch tags from server
    dispatch( fetchTCTags({}) );
  }

  //
  return (<div style={{border:'1px solid black', width:'fit-content', padding:'10px'}}>
    <h4>this is TCFormNew</h4> 

    <div>
      {/*JSON.stringify(newTagName)} / {JSON.stringify(newTagColor) 
      <br />*/}
      <label>Name</label>
      <input type="text" value={newTagName}
        onChange={(e) => {setnewTagName(e.target.value)}}
      />   
      <br /><br />

      <label>Color</label>
      <input type="text" value={newTagColor}
        onChange={(e) => {setnewTagColor(e.target.value)}}
      />          
    </div>
    <br />
    
    <button type="button" onClick={handleAddTagNew}>Add tag</button>
    <button type="button" onClick={props.funcCloseForm}>Close</button>
  </div>)
}

export default TCFormNew;