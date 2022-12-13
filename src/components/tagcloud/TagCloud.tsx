import { FC, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragSourceMonitor, useDrop } from 'react-dnd'

// store
import { RootState, AppDispatch } from '../../rtkstore/store';
import { actionsBaseRed } from '../../rtkstore/baseReducer';
import { actionsTagCloudRed } from '../../rtkstore/tagCloudReducer';

// components
import TagSingle from './TagSingle';
import TagContextMenu from './TagContextMenu';
import TCFormNew from './TCFormNew';
import TCFormEdit from './TCFormEdit';

// style
import './TagCloud.css';

// models
import { TCTagModel } from '../../models/models';

// utils 
import { TCTag_checkTagIdInTagList } from '../../utils/utils';


interface TagCloudProps {
  allowTagsSelect: boolean,   // будут ли кликабельны для фильтрации плашки с тэгами
}

/*
) custom events 
https://blog.logrocket.com/creating-context-menu-react/

) react DnD habr
https://habr.com/ru/company/kts/blog/647241/

) react DnD tutorial and examples
https://react-dnd.github.io/react-dnd/docs/tutorial#setup
https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/00-chessboard?from-embed=&file=/src/TutorialApp.tsx

) react dnd dropped item info demo (!!!)
https://github.com/react-dnd/react-dnd/issues/1550

) react dragable - оценить что тут есть
https://www.npmjs.com/package/react-draggable

*/


//
const TagCloud:FC<TagCloudProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  // store
  const {
    tags,
    tagsSelectedList,
    isOpened,
  } = useSelector( (state: RootState) => ({
    tags:             state.tagCloudReducer.tags,
    tagsSelectedList: state.baseReducer.tagsSelectedList,
    isOpened:         state.tagCloudReducer.isOpened,
  }) )

  // --------------------------------------
  // display of forms: create and edit
  const [isFormTagNew, setisFormTagNew] = useState<boolean>(false);
  const [isFormTagEdit, setisFormTagEdit] = useState<boolean>(false);

  const [tagToEdit, settagToEdit] = useState<TCTagModel>({id:0, name:''});
  const funcDoEdit = (t: TCTagModel) => {
    //console.log(t);
    settagToEdit(t);          // присвоить isFormTagEdit
    setShowTagMenu(false);    // закрыть контекстное меню
    setisFormTagEdit(true);   // открыть форму редактирования
  }


  // context menu tag
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [tagSelectedContMenu, settagSelectedContMenu] = useState<TCTagModel>({id:-2, name:''}); // на кого кликнули ПКМ (контекстное меню в TagCloud)
  
  // tag search str
  const [tagSearchStr, settagSearchStr] = useState<string>('');

  //
  const handleContextMenu =  (event: any) => { 
    let elem = event.target; 
    //console.log(elem, elem.classList, elem.dataset);
    event.preventDefault();

    // filter tag element
    if (elem.classList.contains('tc_tagSingle')) {
      //console.log(elem.dataset);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      
      let selId: number = Number(elem.dataset.id);
      //console.log(selId, tags);
      let selTag = tags.filter( (item) => item.id === selId);
      //console.log('selTag=', selTag);
      settagSelectedContMenu(selTag[0]);
      setShowTagMenu(true);
    }
  }; //, useCallback( [setAnchorPoint] )
  
  /* 
  const handleClick = useCallback( () => {
    return (showTagMenu ? setShowTagMenu(false) : null);
  }, [showTagMenu])
  */

  useEffect( () => {
    const tcDiv = document.getElementById('tc_div')
    //tcDiv!.addEventListener("click", handleClick);
    tcDiv!.addEventListener("contextmenu", handleContextMenu);
    return () => {
      //tcDiv!.removeEventListener("click", handleClick);
      tcDiv!.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  // ---------------------------------------------
  // list of selected tags
  //const [tagsSelectedList, setTagsSelectedList] = useState<TCTagModel[]>([]);

  // select tag on tagcloud panel and update store state
  const handleTagSelect = (item: TCTagModel) => {
    //console.log(item, tagsSelectedList.includes(item));
    let activeTagArr = [...tagsSelectedList];
    if (!TCTag_checkTagIdInTagList(tagsSelectedList, item)) { //tagsSelectedList.includes(item)
      activeTagArr.push(item);
    } else {
      let removeIndex = activeTagArr.indexOf(item);
      activeTagArr.splice(removeIndex, 1);
    }
    //setTagsSelectedList(activeTagArr); // local variable
    dispatch( actionsBaseRed.setTagsSelectedList(activeTagArr) )    // store
  }


  // ---------------------------------------------
  // DROP in special area div
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['tag_single'],
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),    
    drop: (item: any, monitor) => {
      console.log('dropped item:', item);
      dropHandler(item);
    },
  }), [])

  // taken from store
  const [divTagsList, setDivTagsList] = useState<TCTagModel[]>([]);

  const dropHandler = (item: TCTagModel) => {
    let tmpList = divTagsList;
    let flgFound = TCTag_checkTagIdInTagList(tmpList, item);
    if (!flgFound) {
      tmpList.push(item);
      setDivTagsList(tmpList); 
    }
  }


  //
  return (
  <div className='tc_wrapper' id="tc_div">
    <div style={{display:'flex', alignItems:'center'}}>
      <div className='tc_divBtn' 
        onClick={() => { 
          dispatch(actionsTagCloudRed.setIsOpened(!isOpened))
         }}
      >
        { isOpened ? 'hide' : 'show more' }
      </div>
      
      <h3 style={{marginLeft:'5px'}}>TagCloud</h3> 
    </div>
    
    { isOpened 
      ? <div style={{border:'1px solid black', padding:'5px'}}>
      
          {/* new tag form button */}
          <button type="button" 
            className='tc_divBtn'
            onClick={() => { setisFormTagNew(true) }}
          >
            add new tag
          </button>

          <br /><br />
          
          {/* 
          <div>selected tags: {JSON.stringify(tagsSelectedList)}</div>
          <div>anchorPoint={JSON.stringify(anchorPoint)} | showTagMenu={JSON.stringify(showTagMenu)}</div>
          <div>tagSelectedContMenu: {JSON.stringify(tagSelectedContMenu)}</div>
          <div>tags: {JSON.stringify(tags)}</div>  
          */}

          {/*JSON.stringify(tagSearchStr)*/} 
          <input type="text" onChange={(e) => { settagSearchStr(e.target.value) }}/>

          {/* tags (filtered) available */}
          <div className='tc_tagsContainer'>
            { tags
            .filter( (item) => {
              return item.name.toLowerCase().includes(tagSearchStr.toLowerCase())
            })
            .map( (item) => {
              return <TagSingle key={item.id}
                item={item}
                itemType='tag_single'
                classStr={'tc_tagSingle' + (TCTag_checkTagIdInTagList(tagsSelectedList, item) ? ' tc_tagSingle__active' : '') }
                handleTagSelect={ (props.allowTagsSelect) ? handleTagSelect : () => {}}   // кастомный обработчик клика на Tag (по переменной из пропсов)
              />
            }) }
          </div>

          {/* tag context menu ------------------------------------------ */}
          {/*JSON.stringify(showTagMenu)*/}
          { showTagMenu 
            ? <TagContextMenu 
              anchorPoint={anchorPoint}
              tagSelectedContMenu={tagSelectedContMenu}
              funcCloseContMenu={() => {setShowTagMenu(false)} }
              funcDoEdit={funcDoEdit}
            />
            : <></>
          }

          {/* form tag create ------------------------------------------ */}
          { isFormTagNew 
            ? <>
            <TCFormNew 
              funcCloseForm={() => { setisFormTagNew(false) }}
            />
            </> 
            : <></> 
          }
          {/* ------------------------------------------ */}

          {/* form tag edit ------------------------------------------ */}  
          { isFormTagEdit 
            ? <>
            <TCFormEdit 
              tagToEdit={tagToEdit}
              funcCloseForm={() => { setisFormTagEdit(false) }}
            />
            </> 
            : <></> 
          }    
    
          {/* ------------------------------------------ */}

      </div> 
    : <></> 
    }

    
    </div>)
}

export default TagCloud;
