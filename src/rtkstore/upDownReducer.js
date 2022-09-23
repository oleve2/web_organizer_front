
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  uploadStatus: '',
  filesInfo: '', // {files_list:[...], serve_url:'/f1'}
}

const upDownReducer = createSlice({
  name: 'upDownReducer', 
  initialState: initialState,
  reducers: {
    setuploadStatus(state, action) { state.uploadStatus = action.payload },
    setFilesInfo(state, action) { state.filesInfo = action.payload },
  }
})

export const actionsUpDownRed = upDownReducer.actions;
export default upDownReducer.reducer;

export const fetchFilesInfo = createAsyncThunk(
  'data/filesInfo',
  async (obj, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/files_list')
    let data = await resp.json();
    //console.log('fetchFilesList data=', data);
    thunkAPI.dispatch( actionsUpDownRed.setFilesInfo(data) );
  }
)

export const filesUpload = createAsyncThunk(
  'data/filesUPload',
  async (obj, thunkAPI) => {
    let dt = new Date().toString();
    thunkAPI.dispatch( actionsUpDownRed.setuploadStatus('in progress ' + dt) );

    const formData = new FormData();
    // работаем с obj.file из объекта (1й арг функции)
    for (let i=0; i < obj.file.length; i++) {
      formData.append("dataFile", obj.file[i]);  //append file
    }
    //formData.append("val1", 111);            // append field to form (example)
    //formData.append("val2", 222);
    //console.log('formData=', formData);

    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/form_upload', {
      method: 'POST',      
      body: formData//,
      //headers: {"Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*'}
    })
    await resp.json(); //let data = 
    //console.log('data=', data);    

    dt = new Date().toString();
    thunkAPI.dispatch( actionsUpDownRed.setuploadStatus('done ' + dt) );    
  }
)



