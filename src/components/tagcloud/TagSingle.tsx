import { FC } from 'react';
import { useDrag } from 'react-dnd'

// style
import './TagCloud.css';

// models
import { TCTagModel } from '../../models/models';


interface TagSingleProps {
  item: TCTagModel,
  classStr: string,
  itemType: string,
  handleTagSelect: (val: TCTagModel) => void,
}

//
const TagSingle:FC<TagSingleProps> = (props) => {
  const [{isDragging}, drag] = useDrag( () => ({
    type: props.itemType, //'tag_single',
    item: props.item,
    collect: monitor => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(), //!!
    }),
  }))
  
  return (<div 
    data-id={props.item.id} data-name={props.item.name}
    ref={drag}
    className={props.classStr}
    onClick={() => { props.handleTagSelect(props.item) }}
    //style={{ backgroundColor:`${props.item.color}`}}
  >
    {props.item.name}
  </div>)
}

export default TagSingle;
