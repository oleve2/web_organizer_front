
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from '../components/layout/Navigation';
import BaseCard   from '../components/base/baseCard';

import { actionsBaseRed, CalcPartsWithCnts } from '../rtkstore/baseReducer';

//
export default function PageBase(props) {
  const dispatch = useDispatch();

  const baseItems = useSelector( (store) => store.baseReducer.items )
  const partsArray = useSelector( (store) => store.baseReducer.partsArray );
  
  // store 
  const storePartSelected = useSelector( (store) => store.baseReducer.partSelected);
  const storeThemeSelected = useSelector( (store) => store.baseReducer.themeSelected);
  const storeSearchStr    = useSelector( (store) => store.baseReducer.searchStr);

  // filtered baseItems
  const [baseItemsFilt, setbaseItemsFilt] = useState(baseItems);
  const [themesFilt, setThemesFilt] = useState([]);
  
  useEffect( () => {
    document.title = "WA3: KnowBase";
    setbaseItemsFilt(baseItems);
    doSearch();
  }, [baseItems])

  //
  const doSearch = () => {
    let bif = baseItems
    .filter( (item) => {
      if (storePartSelected !== 'All') {
        return (item.part === storePartSelected);
      } else {
        return item;
      }
    })
    .filter( (item) => {
      if (storeThemeSelected !== 'All') {
        return (item.theme === storeThemeSelected);
      } else {
        return item;
      }
    })    
    .filter( (item) => {
      return (item.part.toLowerCase().includes(storeSearchStr.toLowerCase()) 
        || item.title.toLowerCase().includes(storeSearchStr.toLowerCase()) 
        || item.theme.toLowerCase().includes(storeSearchStr.toLowerCase()) 
        || item.text.toLowerCase().includes(storeSearchStr.toLowerCase()) 
        )
    })
    setbaseItemsFilt(bif);
    // calculate themes
    let tmpThemes = CalcPartsWithCnts(bif, 'theme');
    setThemesFilt(tmpThemes);
  }
  
  const selectPart = (val) => { 
    dispatch(actionsBaseRed.setPartSelected(val));
  }

  const selectTheme = (val) => {
    dispatch(actionsBaseRed.setThemeSelected(val));
  }

  const selectSearch = (val) => {
    dispatch(actionsBaseRed.setSearchStr(val));
  }


  // ---------------------
  return (
    <>
    <Navigation/>
    <hr/>    

    <br/><br/>
    <input 
      value={storeSearchStr} 
      onChange={(e) => { selectSearch(e.target.value) }}
    /> 
    <button onClick={doSearch}>Search!</button>


    <h3>Parts /{storePartSelected}</h3>
    <div className="base-partsArr-list">
      <div 
        className={"base-partsArr-list__item " + ('All' === storePartSelected ? 'base-partsArr-list__item_active' : '')} 
        onClick={() => {selectPart('All')} }
      > All
      </div>

      { partsArray.map( (item) => {
        return <div key={item.part} 
            className={"base-partsArr-list__item " + (item.part === storePartSelected ? 'base-partsArr-list__item_active' : '')} 
            onClick={() => { selectPart(item.part) }}
          >
          {item.part}: {item.cnt}
        </div>
      }) }  
    </div>

    
    <h3>Themes /{storeThemeSelected}</h3>
    <div className="base-partsArr-list">
      <div 
        className={"base-partsArr-list__item " + ('All' === storeThemeSelected ? 'base-partsArr-list__item_active' : '')} 
        onClick={() => {selectTheme('All')} }
      > All
      </div>

      {themesFilt.map((item) => {
        return <div key={item.theme}
        className={"base-partsArr-list__item " + (item.theme === storeThemeSelected ? 'base-partsArr-list__item_active' : '')} 
          onClick={() => { selectTheme(item.theme) }}
          >
          {item.theme}: {item.cnt}
        </div>
      })}
    </div> 


    <h3>Cards</h3>
    <ul className="base-card-list">
    {
    (baseItemsFilt.length > 0) 
      ? <>
      { baseItemsFilt.map( (item) => {
        return <BaseCard key={item.id} item={item}/>
      }) }      
      </>
      : <></>
    }
    </ul>

    </>
  )
}