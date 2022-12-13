
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
//import { RootState } from "./store";

// utils

// models
import { TCTagModel } from "../models/models";

interface TagCloudState {
  isOpened: boolean,
  tags: TCTagModel[],
}

const initialState: TagCloudState = {
  isOpened: false,
  tags: [],
}

const tagCloudReducer = createSlice({
  name: 'tagCloudReducer',
  initialState: initialState,
  reducers: {
    setIsOpened(state, action: PayloadAction<boolean>) { // isOpened
      state.isOpened = action.payload;
    },
    setTags(state, action: PayloadAction<TCTagModel[]>) { // tags
      state.tags = action.payload;
    }
  }
})

export const actionsTagCloudRed = tagCloudReducer.actions;
export default tagCloudReducer.reducer;

// 
export const fetchTCTags = createAsyncThunk(
  'tagcloud/fetchTCTags',
  async (obj: Object, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/tags_all');
    let data: TCTagModel[] = await resp.json();
    //console.log('tags data=', data);
    thunkAPI.dispatch(actionsTagCloudRed.setTags(data));
  }
)

export const insertOneTCTag = createAsyncThunk(
  'tagcloud/insertOneTCTag',
  async (obj: TCTagModel, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/tags_insertOne', {
      method: 'POST',
      body: JSON.stringify(obj)
    });
    let data = await resp.json();
    console.log(data);
  }
)

export const updateOneTCTag = createAsyncThunk(
  'tagcloud/updateOneTCTag',
  async (obj: TCTagModel, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/tags_updateOne', {
      method: 'POST',
      body: JSON.stringify(obj)
    });
    let data = await resp.json();
    console.log(data);    
  }
)

export const deleteOneTCTag = createAsyncThunk(
  'tagcloud/deleteOneTCTag',
  async (obj: Number, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/tags_deleteOne/${obj}`, {
      method: 'POST',
      body: JSON.stringify(obj)
    });
    let data = await resp.json();
    console.log(data);    
  }
)