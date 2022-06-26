import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../layout/Navigation";
import ReactMarkdown from 'react-markdown'  
import { fetchBaseItems } from "../../rtkstore/baseReducer";
import { useDispatch } from "react-redux";


export default function BaseCardSingle(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [card, setCard] = useState('');

  const [frmPart, setFrmPart] = useState('');
  const [frmTheme, setFrmTheme] = useState('');
  const [frmTitle, setFrmTitle] = useState('');
  const [frmText,  setFrmText] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  useEffect( () => {
    async function fetchData() {
      let resp = await fetch(process.env.REACT_APP_BASE_URL+`/api/v1/post/${id}`, {
        method: 'GET',
        //headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      });
      let data = await resp.json();
      //console.log({data});
      setCard(data);

      setFrmPart(data.part);
      setFrmTheme(data.theme);
      setFrmTitle(data.title);
      setFrmText(data.text);
    };
    fetchData();
  }, [id])

  useEffect( () => {
    document.title = `WA3: Card #${id}`;
  },[])  

  //
  const handleSaveChanges = async () => {
    let dataObj = {
      id: card.id,
      part: frmPart,
      theme: frmTheme,
      title: frmTitle,
      text: frmText
    }
    console.log('saving changes ....'); //, dataObj

    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/postUpdate', {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })
    console.log(resp.ok);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    const data = await resp.json();
    console.log('getServiceByIdUpgr =', data);
    dispatch(fetchBaseItems());
  }

  // 
  const handleDelete = async () => {
    console.log(`deleting ${card.id}`);
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/postDelete/${card.id}`, {
      method: 'POST'
    })
    console.log(resp.ok);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    const data = await resp.json();
    console.log('handleDelete =', data);
    dispatch(fetchBaseItems());
    navigate('/base');
  }


  // 
  return (
    <>
    <Navigation/>
    <hr/> 
    
    <button className="button-control button-edit" onClick={() => {setIsEdit(!isEdit)}}>Edit ({JSON.stringify(isEdit)})</button>

    { (isEdit) 
    ? <button className="button-control button-save" onClick={handleSaveChanges}>Save changes</button>
    : <></> 
    }

    <br/>
    <hr/>

    <div>Id:{card.id}</div>

    { (isEdit === false)
    ? <>
      <div>Part: {card.part}</div>
      <div>Theme: {card.theme}</div>
      <div>Title: {card.title}</div> 
      <br/>
      <ReactMarkdown children={frmText}/>
    </>
    : <>
      <div> <input value={frmPart}   onChange={(e) => { setFrmPart(e.target.value) }}/> </div>
      <div> <input value={frmTheme}  onChange={(e) => { setFrmTheme(e.target.value) }}/> </div>
      <div> <input value={frmTitle}  onChange={(e) => { setFrmTitle(e.target.value) }}/> </div>
      <br/>
      <textarea className="base-card-single__textarea" 
        value={frmText}
        onChange={ (e) => { setFrmText(e.target.value) }}
      ></textarea>
    </>
    }
    <br/>
    <button className="button-control button-delete" onClick={handleDelete}>Delete Post</button>
    {/* */}
    </>
  )
}
