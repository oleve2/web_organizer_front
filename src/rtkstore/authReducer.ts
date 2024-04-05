import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

// models
import { LoginTokenModel } from '@/models/models';

interface AuthState {
  login: string,
  token: string,
}

const initialState: AuthState = {
  login: '',
  token: '',
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    }
  }
})

export const actionsAuthRed = authReducer.actions;
export default authReducer.reducer;

const lsKey = 'wa3_ls';

//
export const setLoginToken = createAsyncThunk(
  'auth/setLoginToken',
  async (obj: LoginTokenModel, thunkAPI) => {
    thunkAPI.dispatch(actionsAuthRed.setLogin(obj.login));
    thunkAPI.dispatch(actionsAuthRed.setToken(obj.token));
    toLS(obj); //{login: login, token: token}
  }
)

export const fromLS = createAsyncThunk(
  'auth/fromLS',
  async (obj: {}, thunkAPI) => {
    let data = localStorage.getItem(lsKey);
    //console.log('data=', data);
    if (data === undefined || data === null || data === '') {
      console.log('nothing in LS');
    } else {
      let tmp = JSON.parse(data);
      thunkAPI.dispatch( actionsAuthRed.setLogin(tmp.login) );
      thunkAPI.dispatch( actionsAuthRed.setToken(tmp.token) );    
    }    
  }
) 

export const logoutAndClearLS = createAsyncThunk(
  'auth/fromLS',
  async (obj: {}, thunkAPI) => {
    thunkAPI.dispatch( actionsAuthRed.setToken('') );
    thunkAPI.dispatch( actionsAuthRed.setLogin('') );
    localStorage.removeItem(lsKey);
  }
)


//
export const toLS = (dataObj: LoginTokenModel) => {
  let data = JSON.stringify({login: dataObj.login, token: dataObj.token});
  localStorage.setItem(lsKey, data);
}


