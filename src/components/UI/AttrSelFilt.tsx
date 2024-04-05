
import { FC, useState } from 'react';

// styles
import './AttrSelFilt.css';

// models
import { PartModel } from '@/models/models';

interface AttrSelFiltProps {
  attrTitle: string,
  attrSelected: string,
  partsArray: PartModel[],
  handleSelectAttr: (val: string) => void, // selectPart
  isOpened: boolean,
  storeSetIsOpened?: () => void,
  showId?:boolean,
}

//
const AttrSelFilt:FC<AttrSelFiltProps> = (props) => {
  const [filterStr, setfilterStr] = useState<string>('');
  //const [isOpen, setIsOpen] = useState<boolean>(props.isOpened);

  return (<>
    <div style={{display:'flex', marginTop:'10px'}}>
      <div className='divControlBtn' onClick={props.storeSetIsOpened}>
        { props.isOpened ? 'hide' : 'show more' }
      </div>

      <div className='divControlBtn' onClick={() => { props.handleSelectAttr('All') }}>Reset to 'All'</div>

      <div className='divArrt_h3'>{props.attrTitle} /{props.attrSelected}</div>
    </div>

    { props.isOpened && 
    <div style={{border:'1px solid black', padding:'10px', marginTop:'5px'}}>
      <input type="text" onChange={(e) => { setfilterStr(e.target.value) }} />

      <div className="base-partsArr-list">
        <div 
          className={"base-partsArr-list__item " + ('All' === props.attrSelected ? 'base-partsArr-list__item_active' : '')} 
          onClick={() => { props.handleSelectAttr('All')} }
        > All
        </div>

        { props.partsArray
          .filter( (elem) => {
            return elem.part.toLowerCase().includes(filterStr.toLowerCase())
          })
          .map( (item) => {
            return <div key={item.part} 
              className={"base-partsArr-list__item " + (item.part === props.attrSelected ? 'base-partsArr-list__item_active' : '')} 
              onClick={() => { props.handleSelectAttr(item.part) }}
            >
            {item.part}{props.showId ? `(id=${item.id})` : ''}: {item.cnt}
          </div>
        }) }  
      </div>    
    </div>}
    <br />
  </>)
}

export default AttrSelFilt;
