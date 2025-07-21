
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// store
import { RootState } from "./store";

// models
import { FilesInfoModel, UploadFileModel, IFileDownld, FilesInfoModelFilteredPaged, 
  FileUpdateDeleteRequest, FileUpdateDeleteResponseModel } from '@/models/models';

// utils
import { DivideArrayOnParts } from "@/utils/utils";
import { calcNumOfPages } from "@/utils/utils";


interface UpDownState {
  uploadStatus: string,
  searchStr: string,
  filesInfo: FilesInfoModel,
  filesInfoFiltered: FilesInfoModel,
  filesInfoFilteredPaginated: FilesInfoModelFilteredPaged,

  // divide to pages
  currentPage: number,
  maxPerPage: number,
  numOfPages: number,  
  
}

const initialState: UpDownState = {
  uploadStatus: '',
  searchStr: '',
  filesInfo: {files_list: [], serve_url: ''},
  filesInfoFiltered: {files_list: [], serve_url: ''},
  filesInfoFilteredPaginated: {files_list: [], serve_url: ''},

  // divide to pages
  currentPage: 0,
  maxPerPage: 10,
  numOfPages: 0,    
}

const upDownReducer = createSlice({
  name: 'upDownReducer', 
  initialState: initialState,
  reducers: {
    setuploadStatus(state, action: PayloadAction<string>) { 
      state.uploadStatus = action.payload 
    },
    setFilesInfo(state, action: PayloadAction<FilesInfoModel>) { 
      state.filesInfo = action.payload 
    },
    setsearchStr(state, action: PayloadAction<string>) {
      state.searchStr = action.payload
    },

    setfilesInfoFiltered(state, action: PayloadAction<FilesInfoModel>) {
      state.filesInfoFiltered = action.payload;
    },
    setfilesInfoFilteredPaged(state, action: PayloadAction<FilesInfoModelFilteredPaged>) {
      state.filesInfoFilteredPaginated = action.payload;
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

export const actionsUpDownRed = upDownReducer.actions;
export default upDownReducer.reducer;

export const fetchFilesInfo = createAsyncThunk(
  'data/filesInfo',
  async (obj: Object, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/files_list')
    let data: FilesInfoModel = await resp.json();
    thunkAPI.dispatch( actionsUpDownRed.setFilesInfo(data) );
    thunkAPI.dispatch( filterPageFilesArray({}) );
    //thunkAPI.dispatch( actionsUpDownRed.setCurrentPage(0)); // вопрос - в какой момент это вообще делается?
  }
)

export const filterPageFilesArray = createAsyncThunk(
  'data/filterFilesArray', 
  async (obj: Object, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let searchStr = appState.upDownReducer.searchStr;
    let fileInfoArr = appState.upDownReducer.filesInfo;

    // filter
    let FI_filt: IFileDownld[] = [];
    if (searchStr === "") {
      FI_filt = fileInfoArr.files_list;
    } else {
      FI_filt = fileInfoArr.files_list.filter( (item) => {
        return item.file_name.toLowerCase().includes(searchStr.toLowerCase());
      })
    }
    let fileInfoArrFilt: FilesInfoModel = {files_list: FI_filt, serve_url: fileInfoArr.serve_url};
    thunkAPI.dispatch(actionsUpDownRed.setfilesInfoFiltered(fileInfoArrFilt));

    // calc numOfPages
    let numOfPages = calcNumOfPages<IFileDownld>(fileInfoArrFilt.files_list, appState.upDownReducer.maxPerPage);
    thunkAPI.dispatch( actionsUpDownRed.setNumOfPages(numOfPages) );

    // slicing to pages
    let FI_filtered_paged: IFileDownld[][] = DivideArrayOnParts<IFileDownld>(
      fileInfoArrFilt.files_list, 
      appState.upDownReducer.maxPerPage,
      numOfPages,
    );
    let FI_Filt_Paged: FilesInfoModelFilteredPaged = {
      serve_url: fileInfoArr.serve_url,
      files_list: FI_filtered_paged,
    }
    thunkAPI.dispatch( actionsUpDownRed.setfilesInfoFilteredPaged(FI_Filt_Paged) );
  } 
)


export const filesUpload = createAsyncThunk(
  'data/filesUPload',
  async (obj: UploadFileModel, thunkAPI) => {
    let dt = new Date().toString();
    thunkAPI.dispatch( actionsUpDownRed.setuploadStatus('in progress: ' + dt) );

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
      body: formData,
    })
    await resp.json();

    dt = new Date().toString();
    thunkAPI.dispatch( actionsUpDownRed.setuploadStatus('done: ' + dt) );    
  }
)

export const FileDoUpdateName = createAsyncThunk(
  'data/fileDoUpdateName',
  async (obj: FileUpdateDeleteRequest, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/files_updateItem', {
      method: 'POST',
      body: JSON.stringify(obj),
    })
    let data: FileUpdateDeleteResponseModel = await resp.json();
    console.log(data);
    
    if (data.status === true) {
      thunkAPI.dispatch(fetchFilesInfo({}));
    }
  }
)

export const FileDoDelete = createAsyncThunk(
  'data/fileDoDelete',
  async (obj: FileUpdateDeleteRequest, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/files_deleteItem', {
      method: 'POST',
      body: JSON.stringify(obj)
    })
    let data: FileUpdateDeleteResponseModel = await resp.json();
    console.log(data);
    
    if (data.status === true) {
      thunkAPI.dispatch(fetchFilesInfo({}));
    }
  }
)
