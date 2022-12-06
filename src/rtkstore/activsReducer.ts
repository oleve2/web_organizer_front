import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// functions
import { CalcPartsWithCnts, suppFindKeyInActivArr } from "../utils/utils";
import { calcNumOfPages, DivideArrayOnParts } from "../utils/utils";

// models
import { PartModel, ActivityLogModel, ActivityModel } from '../models/models';
import { RootState } from "./store";

interface ActivsState {
  activLogs: ActivityLogModel[],
  activLogsFiltered: ActivityLogModel[],
  activLogsFilteredPaged: ActivityLogModel[][],

  activNameSelected: string,
  activNamesList: PartModel[],

  currentPage: number,
  maxPerPage: number,
  numOfPages: number,
}

const initialState: ActivsState = {
  activLogs: [],
  activLogsFiltered: [],
  activLogsFilteredPaged: [],

  activNameSelected: 'All',
  activNamesList: [],

  currentPage: 0,
  maxPerPage: 10,
  numOfPages: 0,    
}

const activsReducer = createSlice({
  name: 'activsReducer',
  initialState: initialState,
  reducers: {
    setActivLogs(state, action: PayloadAction<ActivityLogModel[]>) {
      state.activLogs = action.payload;
    },
    setActivLogsFiltered(state, action: PayloadAction<ActivityLogModel[]>) {
      state.activLogsFiltered = action.payload;
    },    
    setActivLogsFilteredPaged(state, action: PayloadAction<ActivityLogModel[][]>) {
      state.activLogsFilteredPaged = action.payload;
    },        

    setActivNameSelected(state, action: PayloadAction<string>) {
      state.activNameSelected = action.payload;
    },    
    setActivNamesList(state, action: PayloadAction<PartModel[]>) {
      state.activNamesList = action.payload;
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
  }
})

export const actionsActivsRed = activsReducer.actions;
export default activsReducer.reducer;

// thunks --------------------------------------
// search and filter
export const doActivsSearch = createAsyncThunk(
  'activs/doActivsSearch',
  async (obj: Object, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let activLogs = appState.activsReducer.activLogs;
    let activLogsFiltered: ActivityLogModel[] = activLogs
      .filter( (item) => {
        if (appState.activsReducer.activNameSelected !== 'All') {
          return (item.activ_name === appState.activsReducer.activNameSelected);
        } else {
          return item;
        }
      })
    thunkAPI.dispatch( actionsActivsRed.setActivLogsFiltered(activLogsFiltered) );

    // calc numOfPages
    let numOfPages = calcNumOfPages<ActivityLogModel>(activLogsFiltered, appState.activsReducer.maxPerPage);
    thunkAPI.dispatch( actionsActivsRed.setNumOfPages(numOfPages) );    

    // slicing to pages
    let activLogsFilteredPaged: ActivityLogModel[][] = DivideArrayOnParts<ActivityLogModel>(
      activLogsFiltered, appState.activsReducer.maxPerPage, numOfPages);
    thunkAPI.dispatch( actionsActivsRed.setActivLogsFilteredPaged(activLogsFilteredPaged) )    
  }
)



// 01) get activity log items
export const fetchActivLogs = createAsyncThunk(
  'activs/fetchActivLogs',
  async (obj: Object, thunkAPI) => {
    // получили из activ_logs
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs', {method: 'GET'});
    let dataJson: ActivityLogModel[] = await resp.json();
    thunkAPI.dispatch(actionsActivsRed.setActivLogs(dataJson));    

    // list of active activities (r1 => activsActive)
    let activsActive: PartModel[] = CalcPartsWithCnts<ActivityLogModel>(dataJson , 'activ_name');
    
    // получили базу из activ_names
    let respNames = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_names', {method: 'GET'});
    let dataNJson: ActivityModel[] = await respNames.json();
    
    // добавить недостающие ключи в r1
    /**/
    dataNJson.forEach( (item) => {
      let foundRes = suppFindKeyInActivArr(item.name, activsActive, 'part');
      if (!foundRes.found) { 
        activsActive.push({part: item.name, cnt: 0, id: item.id});
      } else {
        for (let i=0; i < activsActive.length; i++) {
          if (activsActive[i].part === item.name) {
            activsActive[i].id = item.id;
          }
        }
      }
    })
    //
    thunkAPI.dispatch(actionsActivsRed.setActivNamesList(activsActive));
  }
)

// 02) saving new activity log
export const fetchSaveNewActiv = createAsyncThunk(
  'activs/fetchSaveNewActiv',
  async (obj: ActivityLogModel, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs_new', {
      method:'POST', 
      body: JSON.stringify(obj)
    });
    await resp.json();
    thunkAPI.dispatch(fetchActivLogs({}));
  }
)  

// 03) saving new activName
export const fetchSaveNewActivName = createAsyncThunk(
  'activs/fetchSaveNewActivName',
  async (obj: ActivityModel, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_names_new', {
      method:'POST', 
      body: JSON.stringify(obj)
    });    
    await resp.json(); 
    thunkAPI.dispatch(fetchActivLogs({}));  
  }
)  

// 04) deleting activity log item by id
export const fetchDeleteActivLogById = createAsyncThunk(
  'activs/fetchDeleteActivLogById',
  async (id: number, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/activ_logs_del/${id}`, {method: 'POST'})
    await resp.json()
    thunkAPI.dispatch(fetchActivLogs({}));
  }
)  

// 05) update activity log item by id // http://localhost:9999/api/v1/activ_logs_upd
export const fetchUpdateActivLogById = createAsyncThunk(
  'activs/fetchUpdateActivLogById',
  async (obj: ActivityLogModel, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs_upd', {
      method:'POST', 
      body: JSON.stringify(obj)
    });
    await resp.json();
    thunkAPI.dispatch(fetchActivLogs({})); 
  }
)  
