import Navigation from "../layout/Navigation"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBaseItems } from "../../rtkstore/baseReducer";

// styles
import './baseCardNew.css';

//
export default function BaseCardNew(props) {
  const [frmPart, setFrmPart]   = useState('');
  const [frmTheme, setFrmTheme] = useState('');
  const [frmTitle, setFrmTitle] = useState('');
  const [frmText,  setFrmText]  = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //
  const handleSaveNewPost = async () => {
    let dataObj = {
      id:     0,
      part:   frmPart,
      theme:  frmTheme,
      title:  frmTitle,
      text:   frmText
    }
    console.log('saving post', dataObj);

    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/postNew', {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })
    console.log(resp.ok);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    const data = await resp.json();
    console.log('SaveNewPost fetch data=', data);
    dispatch(fetchBaseItems());
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
