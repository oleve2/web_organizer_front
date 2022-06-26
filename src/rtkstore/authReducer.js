import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: '',
  token: '',
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    }
  }
})

export const actionsAuthRed = authReducer.actions;
export default authReducer.reducer;

const lsKey = 'wa3_ls';

//
export const setLoginToken = (login, token) => async(dispatch) => {
  dispatch( actionsAuthRed.setLogin(login) );
  dispatch( actionsAuthRed.setToken(token) );
  //
  toLS({login: login, token: token});
}

//
export const fromLS = () => async (dispatch) => {
  let data = localStorage.getItem(lsKey);
  //console.log('data=', data);
  if (data === undefined || data === null || data === '') {
    console.log('nothing in LS');
  } else {
    let tmp = JSON.parse(data);
    dispatch( actionsAuthRed.setLogin(tmp.login) );
    dispatch( actionsAuthRed.setToken(tmp.token) );    
  }
}

//
export const toLS = (dataObj) => {
  let data = JSON.stringify({login: dataObj.login, token: dataObj.token});
  localStorage.setItem(lsKey, data);
  console.log('LS login and token set');
}

//
export const logoutAndClearLS = () => async (dispatch) => {
  dispatch( actionsAuthRed.setToken('') );
  dispatch( actionsAuthRed.setLogin('') );
  //
  localStorage.removeItem(lsKey);
  console.log('LS cleared');
}
