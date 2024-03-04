
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Navigation from '../components/layout/Navigation';
import BaseCard   from '../components/base/baseCard';
import Paginator from '../components/UI/Paginator';
import AttrSelFilt from '../components/UI/AttrSelFilt'; 
import TagCloud from '../components/tagcloud/TagCloud';

// models
import { ItemModel } from '../models/models';

// store
import { RootState, AppDispatch } from '../rtkstore/store';
import { actionsBaseRed } from '../rtkstore/baseReducer';
import { doSearchStore } from '../rtkstore/baseReducer';

//import { CalcPartsWithCnts, calcNumOfPages, DivideArrayOnParts } from '../utils/utils';

interface PageBaseProps {}

//
const PageBase:FC<PageBaseProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  // store
  const {
    baseItems,

    partsArray,
    themesArray,
    titlesArrray,
    
    storePartSelected,
    storeThemeSelected,
    storeTitleSelected,
    
    storeSearchStr,
    storeCurrentPage,
    storeitemsFilteredPaged,

    flgIsOpenParts,
    flgIsOpenThemes,
    flgIsOpenTitles,
  } = useSelector( (store: RootState) => ({
    baseItems:            store.baseReducer.items,

    partsArray:           store.baseReducer.partsArray,
    themesArray:          store.baseReducer.themesArray,
    titlesArrray:         store.baseReducer.titlesArray,

    storePartSelected:    store.baseReducer.partSelected,
    storeThemeSelected:   store.baseReducer.themeSelected,
    storeTitleSelected:   store.baseReducer.titleSelected,

    storeSearchStr:       store.baseReducer.searchStr,
    storeCurrentPage:     store.baseReducer.currentPage,
    storeitemsFilteredPaged: store.baseReducer.itemsFilteredPaged,

    flgIsOpenParts: store.baseReducer.flgIsOpenParts,
    flgIsOpenThemes: store.baseReducer.flgIsOpenThemes,
    flgIsOpenTitles: store.baseReducer.flgIsOpenTitles,    
  }))

  const SetActivePageNum = (val: number) => {
    dispatch( actionsBaseRed.setCurrentPage(val) );
  }

  //
  const selectPart = (val: string) => { 
    dispatch(actionsBaseRed.setPartSelected(val));
  }
  const selectTheme = (val: string) => {
    dispatch(actionsBaseRed.setThemeSelected(val));
  }
  const selectTitle = (val: string) => {
    dispatch(actionsBaseRed.setTitleSelected(val));
  }
  const selectSearch = (val: string) => {
    dispatch(actionsBaseRed.setSearchStr(val));
  }

  // set isOpened for parts, themes, titles
  const storeSetIsOpenedParts = () => {
    dispatch( actionsBaseRed.setflgIsOpenParts(!flgIsOpenParts) );
  }
  const storeSetIsOpenedThemes = () => {
    dispatch( actionsBaseRed.setflgIsOpenThemes(!flgIsOpenThemes) );
  }
  const storeSetIsOpenedTitles = () => {
    dispatch( actionsBaseRed.setflgIsOpenTitles(!flgIsOpenTitles) );
  }  

  //
  useEffect( () => {
    document.title = "WA3: KnowBase";
    dispatch( doSearchStore({}) );
  }, [baseItems, dispatch])


  // ---------------------
  return (<>
  {/*<DndProvider backend={HTML5Backend}>
  </DndProvider>  */}
    
    <Navigation/>
    <hr/>    

    <br/><br/>
    <input 
      value={storeSearchStr} 
      onChange={(e) => { selectSearch(e.target.value) }}
    /> 
    <button onClick={() => { dispatch( doSearchStore({}) ) }} 
      style={{backgroundColor:'blue', padding:'5px', borderRadius:'5px', fontWeight:'bold', marginLeft:'10px', color:'white'}}
      >
        Search and Filter!
    </button>
    
    <TagCloud allowTagsSelect={true}/>

    <AttrSelFilt 
      attrTitle='Parts'
      attrSelected={storePartSelected}
      partsArray={partsArray}
      handleSelectAttr={selectPart}
      isOpened={flgIsOpenParts}
      storeSetIsOpened={storeSetIsOpenedParts}
    />

    <AttrSelFilt 
      attrTitle='Themes'
      attrSelected={storeThemeSelected}
      partsArray={themesArray}
      handleSelectAttr={selectTheme}
      isOpened={flgIsOpenThemes}
      storeSetIsOpened={storeSetIsOpenedThemes}
    />

    <AttrSelFilt 
      attrTitle='Titles'
      attrSelected={storeTitleSelected}
      partsArray={titlesArrray}
      handleSelectAttr={selectTitle}
      isOpened={flgIsOpenTitles}
      storeSetIsOpened={storeSetIsOpenedTitles}
    />

    <h3>Cards</h3>
    
    <Paginator<ItemModel> 
      numOfPages={storeitemsFilteredPaged.length}
      activePageNum={storeCurrentPage}
      setActivePageNum={SetActivePageNum}
    />

    <ul className="base-card-list">
    {/*JSON.stringify(storeitemsFilteredPaged[storeCurrentPage])*/}
    
      { (storeitemsFilteredPaged[storeCurrentPage] !== undefined) 
        ? <>
        { storeitemsFilteredPaged[storeCurrentPage].map( (item) => {
          return <BaseCard key={item.id} item={item}/>
        })
        }
        </> 
        : <></>
      }
    </ul>
    </>
  
  )
}

export default PageBase;