import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../layout/Navigation";
import ReactMarkdown from 'react-markdown'  
import rehypeRaw from "rehype-raw";
import { fetchBaseItems } from "../../rtkstore/baseReducer";
import { useDispatch } from "react-redux";

// store
import { AppDispatch } from '../../rtkstore/store';

// models
import { ItemModel } from "../../models/models";

interface BaseCardSingleProps {}


//
const BaseCardSingle:FC<BaseCardSingleProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [card, setCard] = useState<ItemModel>({id:0, part:'', text:'', theme:'', title:''});

  const [frmPart, setFrmPart] = useState<string>('');
  const [frmTheme, setFrmTheme] = useState<string>('');
  const [frmTitle, setFrmTitle] = useState<string>('');
  const [frmText,  setFrmText] = useState<string>('');

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [delConfirm, setdelConfirm] = useState<boolean>(false);

  //
  useEffect( () => {
    async function fetchData() {
      let resp = await fetch(process.env.REACT_APP_BASE_URL+`/api/v1/post/${id}`, {method: 'GET'});
      let data: ItemModel = await resp.json();
      setCard(data);

      setFrmPart(data.part);
      setFrmTheme(data.theme);
      setFrmTitle(data.title);
      setFrmText(data.text);
    };
    fetchData();
    document.title = `WA3: Card #${id}`;
  }, [id])

  //
  const handleSaveChanges = async () => {
    let dataObj:ItemModel = {
      id: card.id,
      part: frmPart,
      theme: frmTheme,
      title: frmTitle,
      text: frmText
    }

    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/postUpdate', {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    await resp.json();
    dispatch(fetchBaseItems({}));
    setIsEdit(false);
  }

  // 
  const handleDelete = async () => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/postDelete/${card.id}`, {
      method: 'POST'
    })
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    await resp.json();
    dispatch(fetchBaseItems({}));
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
      <ReactMarkdown children={frmText} rehypePlugins={[rehypeRaw]}/>
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
    <button className="button-control button-delete" onClick={() => {setdelConfirm(true)}}>Delete Post</button>
    { delConfirm && 
    <div>
      <div>confirm delete of card#{card.id}</div> 
      <button onClick={handleDelete}>YES</button> <br />
      <button onClick={() => {setdelConfirm(false)}}>NO</button>
    </div>
    }


    {/* */}
    </>
  )
}

export default BaseCardSingle;
