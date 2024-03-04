
/*
partsArray - массив объектов
part - какой элемент объекта будем сравнивать
storePartSelected - текущий выбранный элемент
selectPart() - функция по выбору активного элемента
*/ 
import { FC } from 'react';

interface ULPartsListProps {
  partsArray: any[],
  part: string,
  storePartSelected: string,
  selectPart: (val: string) => void,
}

//
const ULPartsList:FC<ULPartsListProps> = (props) => {
  return (
    <div className="base-partsArr-list">
      <div 
        className={"base-partsArr-list__item " + ('All' === props.storePartSelected ? 'base-partsArr-list__item_active' : '')} 
        onClick={() => {props.selectPart('All')} }
      > All
      </div>

      { props.partsArray.map( (item, index) => {
        return <div key={index}  /* item[props.part] */
            className={"base-partsArr-list__item " + (item[props.part] === props.storePartSelected ? 'base-partsArr-list__item_active' : '')} 
            onClick={() => { props.selectPart(item[props.part]) }}
          >
          {item[props.part]} {item.id !== null ? `(id=${item.id})` : null} : {item.cnt}
        </div>
      }) }  
    </div>
  )
}

export default ULPartsList;
