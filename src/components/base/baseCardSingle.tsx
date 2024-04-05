import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'  
import rehypeRaw from "rehype-raw";
import { useDispatch } from "react-redux";
//import  cloneDeep from 'lodash.clonedeep';

// store
import { fetchBaseItems } from "@/rtkstore/baseReducer";
import { AppDispatch } from '@/rtkstore/store';

// drag-n-drop
import { DragSourceMonitor, useDrop } from 'react-dnd'

// components
import Navigation from "@/components/layout/Navigation";
import TagCloud from "@/components/tagcloud/TagCloud";
import TagSingle from "@/components/tagcloud/TagSingle";

// models
import { ItemModel, TCTagModel } from "@/models/models";

// styles
import '../tagcloud/TagCloud.css';

// utils
import { TCTag_checkTagIdInTagList, TCTag_removeTagFromTagListById } from "@/utils/utils";

interface BaseCardSingleProps {}




//
const BaseCardSingle:FC<BaseCardSingleProps> = (props) => {
  // url params
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // card model
  const [card, setCard] = useState<ItemModel>({id:0, part:'', text:'', theme:'', title:'', tags_list: '', tags_list_json: [] });

  // editable models
  const [frmPart, setFrmPart] = useState<string>('');
  const [frmTheme, setFrmTheme] = useState<string>('');
  const [frmTitle, setFrmTitle] = useState<string>('');
  const [frmText,  setFrmText] = useState<string>('');
  const [frmTagList, setFrmTagList] = useState<TCTagModel[]>([]);


  // 
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [delConfirm, setdelConfirm] = useState<boolean>(false);

  // fetch card data
  const fetchCardDataById = async (id: string) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL+`/api/v1/post/${id}`, {method: 'GET'});
    let data: ItemModel = await resp.json();
    
    // парсим "tags_list" -> "tags_list_json"
    data = {
      ...data, 
      tags_list_json: JSON.parse(data.tags_list)
    };
    //console.log('data=', data);

    // set to form elems
    setCard(data);
    setFrmPart(data.part);
    setFrmTheme(data.theme);
    setFrmTitle(data.title);
    setFrmText(data.text);
    setFrmTagList(data.tags_list_json!); //JSON.parse(data.tags_list)
  }


  // basic data fetch by ID
  useEffect( () => {
    if (id !== undefined) {
      fetchCardDataById(id);
      document.title = `WA3: Card #${id}`;
    }
  }, [id])


  // button handlers-------------------------------------------------
  //
  const handleSaveChanges = async () => {
    let dataObj:ItemModel = {
      id: card.id,
      part: frmPart,
      theme: frmTheme,
      title: frmTitle,
      text: frmText,
      tags_list: JSON.stringify(frmTagList),
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


  // ---------------------------------------------
  // https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
  // DROP (add item to list)
  const [{ isOverAdd }, dropAdd] = useDrop(() => ({
    accept: 'tag_single',
    collect: monitor => ({
      isOverAdd: !!monitor.isOver(),
    }),    
    drop: (item: any, monitor) => {
      //console.log('adding new item:', item);
      if (!TCTag_checkTagIdInTagList(frmTagList, item)) {
        let tmp: TCTagModel = {
          id: item.id, 
          name: item.name, 
          //color:item.color
        }
        setFrmTagList( (oldArr) => [...oldArr, tmp]);
      }
    },
  }), [])

  // taken from store
  //const [divTagsList, setDivTagsList] = useState<TCTagModel[]>([]);

  // handle element drop 
  const dropAddHandler = (item: any) => {
    let tmpList = frmTagList;
    let flgFound = TCTag_checkTagIdInTagList(tmpList, item);
    //console.log(tmpList, flgFound);
    if (!flgFound) {
      tmpList.push(item);
      setFrmTagList(tmpList); 
    }
  }

  const dropRemoveHandler = (item: TCTagModel) => {
    let newArr = TCTag_removeTagFromTagListById(frmTagList, item);
    setFrmTagList(newArr);
  }

  /*
  // DROP (remove item from list)
  const [{ isOverRem }, dropRemove] = useDrop(() => ({
    accept: 'tag_addedToCard',
    collect: monitor => ({
      isOverRem: !!monitor.isOver(),
    }),    
    drop: (item: any, monitor) => {
      console.log('dropped item:', item);
      dropRemoveHandler(item);
    },
  }), [])

  const dropRemoveHandler = (item: TCTagModel) => {
    let newArr = TCTag_removeTagFromTagListById(frmTagList, item);
    setFrmTagList(newArr);
  }
  */

  // ---------------------------------------------
  // 
  return (
    <>
    <Navigation/>
    <hr/> 
    
    <button className="button-control button-edit" onClick={() => {setIsEdit(!isEdit)}}>Edit ({JSON.stringify(isEdit)})</button>

    {/*
    <div>
      <div>card={JSON.stringify(card)}</div> <br />
      <div>frmTagList={JSON.stringify(frmTagList)}</div> <br />
    </div>
    */}

    { (isEdit) 
    ? <button className="button-control button-save" onClick={handleSaveChanges}>
        Save changes
      </button>
    : <></> 
    }

    <br/>
    <hr/>

    <div>Id:{card.id}</div>
    
    <TagCloud allowTagsSelect={false}/>
    <br/>

    
    { (isEdit === false)
    
    ? <div> 
      <div>Part: {card.part}</div>
      <div>Theme: {card.theme}</div>
      <div>Title: {card.title}</div> 
      <br/>

      <div className='tc_tagsDropDivTmp'>
        { frmTagList.map( (item) => {
          return <TagSingle key={item.id}
            classStr={'tc_tagSingle'}
            item={item}
            itemType='tag_addedToCard' // can be dragged to remove area
            handleTagSelect={() => {}}
          />
        })}
      </div>
      
      {/* card main text  */}
      <ReactMarkdown children={frmText} rehypePlugins={[rehypeRaw]}/>
    </div>

    : <div>
        <div> <input value={frmPart}   onChange={(e) => { setFrmPart(e.target.value) }}/> </div>
        <div> <input value={frmTheme}  onChange={(e) => { setFrmTheme(e.target.value) }}/> </div>
        <div> <input value={frmTitle}  onChange={(e) => { setFrmTitle(e.target.value) }}/> </div>
        <br/>

        {/* tag droppable area */}
        <div style={{display:'flex'}}>
          <div className='tc_tagsDropDivTmp' ref={dropAdd}>
            { frmTagList.map( (item) => {
              return <div key={item.id} style={{display:'flex', marginRight:'10px'}}>
              <TagSingle /*key={item.id}*/
                classStr={'tc_tagSingle'}
                item={item}
                itemType='tag_addedToCard'
                handleTagSelect={() => {}}
              />
              <div onClick={() => { dropRemoveHandler(item) }}>x</div>
              </div>
              
            })}
          </div>
        
          {/* zone to accept tage for remove (itemType='tag_addedToCard') */}
          {/* 
          <div className='tc_tagsDropDivTmp' 
            style={{backgroundColor:'yellow'}} 
            ref={dropRemove}
          >
          </div>
          */}
        </div>


      <textarea className="base-card-single__textarea" 
        value={frmText}
        onChange={ (e) => { setFrmText(e.target.value) }}
      ></textarea>
    </div>
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
