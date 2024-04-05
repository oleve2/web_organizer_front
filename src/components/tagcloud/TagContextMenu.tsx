import { FC } from 'react';
import { TCTagModel } from '@/models/models';

interface TagContextMenuProps {
  anchorPoint: {x: number, y: number},
  tagSelectedContMenu: TCTagModel,
  funcCloseContMenu: () => void,

  funcDoEdit?: (t: TCTagModel) => void,         
  funcDoDelete?: () => void,
}

/* 
Обработка по edit и/или delete - нужно делать через store
*/

// 
const TagContextMenu:FC<TagContextMenuProps> = (props) => {
  const handleEdit = () => {
    //console.log(`editing ${props.tagSelectedContMenu.id}`)
    props.funcDoEdit!(props.tagSelectedContMenu);
  }


  return (<div className='tc_menuDiv' style={{top: props.anchorPoint.y, left: props.anchorPoint.x}}>
    { props.tagSelectedContMenu !== undefined 
      ? <>
        <button type='button' onClick={props.funcCloseContMenu}>Close</button> 
        {/*JSON.stringify(props.tagSelectedContMenu)*/}  
        
        <h4>#{props.tagSelectedContMenu.id} /{props.tagSelectedContMenu.name} </h4> 
        
        <button onClick={handleEdit}>
          edit {props.tagSelectedContMenu.name}
        </button>

        <button>
          delete {props.tagSelectedContMenu.name}
        </button>
      </> 
      : <>
      <button type='button' onClick={props.funcCloseContMenu}>Close</button> 
      </> 
    }

  </div>
    )
}

export default TagContextMenu;
