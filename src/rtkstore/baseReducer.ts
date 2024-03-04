import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { CalcPartsWithCnts, AddLink } from "../utils/utils";
import { RootState } from "./store";

// utils
import { 
  calcNumOfPages, DivideArrayOnParts,
  IfOneTagExistsInItem,
} from "../utils/utils";


// models
import { ItemModel, TCTagModel } from "../models/models";


interface BaseState {
  items: ItemModel[],
  itemsFiltered: ItemModel[],
  itemsFilteredPaged: ItemModel[][],

  partsArray: any[],
  themesArray: any[],
  titlesArray: any[],

  partSelected: string,
  themeSelected: string,
  titleSelected: string,
  searchStr: string,
  
  // divide to pages
  currentPage: number,
  maxPerPage: number,
  numOfPages: number,

  // tags list from TagCloud
  tagsSelectedList: TCTagModel[],

  // pageBase - flags for opened searchparts
  flgIsOpenParts: boolean,
  flgIsOpenThemes: boolean,
  flgIsOpenTitles: boolean,
}


const initialState: BaseState = {
  items: [],
  itemsFiltered: [],
  itemsFilteredPaged: [],

  partsArray: [],
  themesArray: [],
  titlesArray: [],

  partSelected: 'All',
  themeSelected: 'All',
  titleSelected: 'All',

  searchStr: '',
  // divide to pages
  currentPage: 0,
  maxPerPage: 10,
  numOfPages: 0,

  tagsSelectedList: [],

  flgIsOpenParts: false,  
  flgIsOpenThemes: false,  
  flgIsOpenTitles: false,  
}

const baseReducer = createSlice({
  name: 'baseReducer',
  initialState: initialState,
  reducers: {
    // items
    setItems(state, action: PayloadAction<ItemModel[]>) {
      state.items = action.payload;
    },
    setItemsFiltered(state, action: PayloadAction<ItemModel[]>) {
      state.itemsFiltered = action.payload;
    },
    setItemsFilteredPaged(state, action: PayloadAction<ItemModel[][]>) {
      state.itemsFilteredPaged = action.payload;
    },    
    // part
    setPartsArray(state, action) {
      state.partsArray = action.payload;
    },
    // theme
    setThemesArray(state, action) {
      state.themesArray = action.payload;
    },    
    // title
    setTitlessArray(state, action) {
      state.titlesArray = action.payload;
    },   
    // select status
    setPartSelected(state, action: PayloadAction<string>) {
      state.partSelected = action.payload;
    },
    setThemeSelected(state, action: PayloadAction<string>) {
      state.themeSelected = action.payload;
    },  
    setTitleSelected(state, action: PayloadAction<string>) {
      state.titleSelected = action.payload;
    },        
    //search 
    setSearchStr(state, action: PayloadAction<string>) {
      state.searchStr = action.payload;
    },

    // divide to pages
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },   
    setMaxPerPage(state, action: PayloadAction<number>) {
      state.maxPerPage = action.payload;
    },
    setNumOfPages(state, action: PayloadAction<number>) {
      state.numOfPages = action.payload;
    },      

    // tag list
    setTagsSelectedList(state, action: PayloadAction<TCTagModel[]>) {
      state.tagsSelectedList = action.payload;
    },

    // pageBase - flags for opened searchparts
    setflgIsOpenParts(state, action: PayloadAction<boolean>) {
      state.flgIsOpenParts = action.payload;
    },    
    setflgIsOpenThemes(state, action: PayloadAction<boolean>) {
      state.flgIsOpenThemes = action.payload;
    },  
    setflgIsOpenTitles(state, action: PayloadAction<boolean>) {
      state.flgIsOpenTitles = action.payload;
    },          
  }
})

export const actionsBaseRed = baseReducer.actions;
export default baseReducer.reducer;


//
export const fetchBaseItems = createAsyncThunk(
  'data/fetchBaseItems',
  async (obj: Object, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/allPosts');
    let data: ItemModel[] = await resp.json();

    let dataWithlink_B1 = AddLink(data, '/base/');  
    let dataWithlink = dataWithlink_B1.map( (item) => {
      return {...item, tags_list_json: JSON.parse(item.tags_list)}
    })
    thunkAPI.dispatch(actionsBaseRed.setItems(dataWithlink)); 
    
    let parts = CalcPartsWithCnts<ItemModel>(dataWithlink, 'part');
    thunkAPI.dispatch(actionsBaseRed.setPartsArray(parts));    

    let themes = CalcPartsWithCnts<ItemModel>(dataWithlink, 'theme');
    thunkAPI.dispatch(actionsBaseRed.setThemesArray(themes));     
  }
)


//
export const doSearchStore = createAsyncThunk(
  'base/doSearch2',
  async (obj: Object, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let baseItems = appState.baseReducer.items;
    let baseItemsFiltered: ItemModel[] = baseItems
      .filter( (item) => { // part
        if (appState.baseReducer.partSelected !== 'All') {
          return (item.part === appState.baseReducer.partSelected);
        } else {
          return item;
        }
      })
      .filter( (item) => {  // theme
        if (appState.baseReducer.themeSelected !== 'All') {
          return (item.theme === appState.baseReducer.themeSelected);
        } else {
          return item;
        }
      })
      .filter( (item) => {  // title
        if (appState.baseReducer.titleSelected !== 'All') {
          return (item.title === appState.baseReducer.titleSelected);
        } else {
          return item;
        }
      })
      .filter( (item) => {
        let searchStr = appState.baseReducer.searchStr;
        return (item.part.toLowerCase().includes(searchStr.toLowerCase()) 
          || item.title.toLowerCase().includes(searchStr.toLowerCase()) 
          || item.theme.toLowerCase().includes(searchStr.toLowerCase()) 
          || item.text.toLowerCase().includes(searchStr.toLowerCase()) 
          )
      })
      .filter( (item) => {
        let tagsSelectedList = appState.baseReducer.tagsSelectedList;
        if (tagsSelectedList.length === 0) {
          return item;
        } else {
          return IfOneTagExistsInItem(item, tagsSelectedList);
        }
      })

    // set filtered
    thunkAPI.dispatch( actionsBaseRed.setItemsFiltered(baseItemsFiltered) );
      
    // calc numOfPages
    let numOfPages = calcNumOfPages<ItemModel>(baseItemsFiltered, appState.baseReducer.maxPerPage);
    thunkAPI.dispatch( actionsBaseRed.setNumOfPages(numOfPages) );

    // slicing to pages
    let baseItemsFilteredPaged: ItemModel[][] = DivideArrayOnParts<ItemModel>(
      baseItemsFiltered, appState.baseReducer.maxPerPage, numOfPages);
    thunkAPI.dispatch( actionsBaseRed.setItemsFilteredPaged(baseItemsFilteredPaged) )
    
    // calculate themes and titles (only on filtered)
    let themes = CalcPartsWithCnts<ItemModel>(baseItemsFiltered, 'theme');
    thunkAPI.dispatch(actionsBaseRed.setThemesArray(themes));      

    let titles = CalcPartsWithCnts<ItemModel>(baseItemsFiltered, 'title');
    thunkAPI.dispatch(actionsBaseRed.setTitlessArray(titles));  
    
    thunkAPI.dispatch(actionsBaseRed.setCurrentPage(0));  
  }
)





