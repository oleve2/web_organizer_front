import { Link } from "react-router-dom"
import { FC } from 'react';

import { ItemModel } from '../../models/models';

// styles
import './baseCard.css';


interface BaseCardprops {
  item: ItemModel,
}

//
const BaseCard:FC<BaseCardprops> = (props) => {
  return (
    <div className="base-card">
      <div><Link to={props.item.prodLink!}>#{props.item.id}</Link> Part: {props.item.part}</div>
      <div>Theme: {props.item.theme}</div>
      <div>Title: {props.item.title} </div>
      <div>{props.item.text.slice(0,30)}...</div>

      <br />
      <div className="tagOnCard_wrapper">{props.item.tags_list_json!.map( (elem) => {
        return <div key={elem.id} className="tagOnCard">
          {elem.name}
        </div>
      })}</div>      
    </div>
  )
}

export default BaseCard;
