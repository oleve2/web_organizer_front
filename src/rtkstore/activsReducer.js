import { createSlice } from "@reduxjs/toolkit";

// for calcs
import { CalcPartsWithCnts } from "./baseReducer";


const initialState = {
  activLogs: [],
  activNamesList: [],
}

const activsReducer = createSlice({
  name: 'activsReducer',
  initialState: initialState,
  reducers: {
    setActivLogs(state, action) {
      state.activLogs = action.payload;
    },
    setActivNamesList(state, action) {
      state.activNamesList = action.payload;
    },
  }
})

export const actionsActivsRed = activsReducer.actions;
export default activsReducer.reducer;



// supp.function - дополняем пустые ключи к r1
const suppNameInR1 = (name, r1) => {
  for (let i=0; i < r1.length; i++) {
    if (r1[i].activ_name === name) {
      return {found: true, index: i};
    }
  }
  return {found: false, index: null};
}

// 01) get activity log items
export const fetchActivLogs = () => async (dispatch) => {  
  // получили из activ_logs
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs', {method: 'GET'});
  let dataJson = await resp.json();
  // [set1]
  dispatch(actionsActivsRed.setActivLogs(dataJson));  //setActivLogs(dataJson);

  //
  let r1 = CalcPartsWithCnts(dataJson , 'activ_name');
  //console.log(r1);
  
  // получили базу из activ_names
  let respNames = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_names', {method: 'GET'});
  let dataNJson = await respNames.json();
  //console.log(dataNJson);

  // добавить недостающие ключи в r1
  dataNJson.forEach( (item) => {
    //console.log('*', item, suppNameInR1(item.name, r1) );
    let t1 = suppNameInR1(item.name, r1);

    if (t1.found === false) { 
      r1.push({id: item.id, activ_name: item.name, cnt: 0}) 
    } else {
      r1[t1.index].id = item.id;
    }
  })
  // [set2]
  dispatch(actionsActivsRed.setActivNamesList(r1));
}

// 02) saving new activity log
export const fetchSaveNewActiv = (dataObj) => async (dispatch) => {
  //console.log(dataObj);
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs_new', {
    method:'POST', 
    body: JSON.stringify(dataObj)
  });
  let respJson = await resp.json();
  console.log('done ', respJson);
  //
  dispatch(fetchActivLogs());
}

// 03) saving new activName
export const fetchSaveNewActivName = (dataObj) => async (dispatch) => {
  //console.log(dataObj);
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_names_new', {
    method:'POST', 
    body: JSON.stringify(dataObj)
  });    
  let respJson = await resp.json();
  console.log('done ', respJson);
  //
  dispatch(fetchActivLogs());  
}

// 04) deleting activity log item by id
export const fetchDeleteActivLogById = (id) => async (dispatch) => {
  //console.log(`deleting ${id}`);
  let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/activ_logs_del/${id}`, {method: 'POST'})
  let respJson = await resp.json();
  console.log('done ', respJson);    
  //await fetchActivLogs();
  dispatch(fetchActivLogs());
}

// 05) update activity log item by id // http://localhost:9999/api/v1/activ_logs_upd
export const fetchUpdateActivLogById = (dataObj) => async (dispatch) => {
  //console.log(dataObj);
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/activ_logs_upd', {
    method:'POST', 
    body: JSON.stringify(dataObj)
  });
  let respJson = await resp.json();
  console.log('done ', respJson);
  //
  dispatch(fetchActivLogs());  
}








