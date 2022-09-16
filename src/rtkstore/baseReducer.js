import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  partsArray: [],
  partSelected: 'All',
  themeSelected: 'All',
  searchStr: '',
}

const baseReducer = createSlice({
  name: 'baseReducer',
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    
    setPartsArray(state, action) {
      state.partsArray = action.payload;
    },

    setPartSelected(state, action) {
      state.partSelected = action.payload;
    },

    setThemeSelected(state, action) {
      state.themeSelected = action.payload;
    },    

    setSearchStr(state, action) {
      state.searchStr = action.payload;
    },        
  }
})

export const actionsBaseRed = baseReducer.actions;
export default baseReducer.reducer;



// 
export const fetchBaseItems = () => async (dispatch) => {
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/allPosts');
  let data = await resp.json();

  let dataWithlink = AddLink(data, '/base/');  
  dispatch(actionsBaseRed.setItems(dataWithlink));

  // parts
  let parts = CalcPartsWithCnts(dataWithlink, 'part');
  dispatch(actionsBaseRed.setPartsArray(parts));
}

/* support ------------------------------------- */ 

// make BOW from parts in items (keyA - ключ по которому мы делаем подсчет)
export const CalcPartsWithCnts = (data, keyA) => {
  // resulting object
  let obj = {};

  // initial fill of object with keyA and counts
  for (let i=0; i < data.length; i++) {
    let tmp = data[i][keyA]; //part;
    if (obj.hasOwnProperty(tmp)) {
      obj[tmp] += 1;
    } else {
      obj[tmp] = 1;
    }
  }

  // convert object to array
  let partsArray = [];
  for (let elem in obj) {
    //console.log(elem, obj[elem]);
    partsArray.push({[keyA]: elem, cnt: obj[elem]}); // part
  }

  // sorting
  partsArray.sort(function(a, b) {
    if (a[keyA].toLowerCase() < b[keyA].toLowerCase()) {return -1}  // part
    if (a[keyA].toLowerCase() > b[keyA].toLowerCase()) {return 1}   // part 
    return 0
  })

  //console.log(partsArray);
  return partsArray;
}

function AddLink(data, prefix) {
  let data2 = data.map( (item) => {
    return {...item, prodLink: `${prefix}${item.id}`}
  });
  return data2;
}

