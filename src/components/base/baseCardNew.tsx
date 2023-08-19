import Navigation from "../layout/Navigation"
import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBaseItems } from "../../rtkstore/baseReducer";
import { useSelector } from "react-redux";

// styles
import './baseCardNew.css';

// store
import { AppDispatch, RootState} from '../../rtkstore/store';

// models
import { ItemModel } from '../../models/models';

interface BaseCardNewProps {}


//
const BaseCardNew:FC<BaseCardNewProps> = (props) => {
  // store
  const {
    storePart,
    storeTheme,
  } = useSelector( (store: RootState) => ({
    storePart: store.baseReducer.partSelected,
    storeTheme: store.baseReducer.themeSelected,
  })
  );

  const [frmPart, setFrmPart]   = useState( (storePart === 'All') ? '' : storePart );
  const [frmTheme, setFrmTheme] = useState( (storeTheme === 'All') ? '' : storeTheme );
  const [frmTitle, setFrmTitle] = useState('');
  const [frmText,  setFrmText]  = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  //
  const handleSaveNewPost = async () => {
    let dataObj: ItemModel = {
      id:     0,
      part:   frmPart,
      theme:  frmTheme,
      title:  frmTitle,
      text:   frmText,
      tags_list: JSON.stringify([]),
    }
    //console.log('saving post', dataObj);

    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/postNew', {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })
    //console.log(resp.ok);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    await resp.json();
    //console.log('SaveNewPost fetch data=', data);
    dispatch(fetchBaseItems({}));
    navigate('/base');
  }

  useEffect( () => {
    document.title = "WA3: Card New";
  },[])

  //
  return (
    <>
    <Navigation/>
    <hr/>     

    <div className="carditem_wrapper"> 
      <label>Part:</label>
      <input value={frmPart}   onChange={(e) => { setFrmPart(e.target.value) }}/> 
    </div>
    <div className="carditem_wrapper">
      <label>Theme:</label> 
      <input value={frmTheme}  onChange={(e) => { setFrmTheme(e.target.value) }}/> 
    </div>
    <div className="carditem_wrapper"> 
      <label>Title:</label>
      <input value={frmTitle}  onChange={(e) => { setFrmTitle(e.target.value) }}/> 
    </div>
    <div>
      Disclaimer! If you want "Part" and "Theme" to be selected automatically - select them in the main BASE menu.
    </div>
    <div>
      if you select "All" - no text would be substituted.
    </div>
    <br/>
    <div className="carditem__textwrapper">
      <label>Text:</label>
      <textarea className="base-card-single__textarea" 
        value={frmText}
        onChange={ (e) => { setFrmText(e.target.value) }}
      ></textarea>
    </div>

    <br/>
    <br/>
    <button onClick={handleSaveNewPost}>Save New Post</button>

    </>
  )
}

export default BaseCardNew;
