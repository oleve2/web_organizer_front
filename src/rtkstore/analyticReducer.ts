import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// models
import { RequestRepCommModel, RepCommonModel, RepIndivGraphsModel } from '@/models/models';


interface AnalyticState {
  dateFrom: string,
  dateTo: string,
  dataRepCommon: RepCommonModel[],
  dataIndivGraphs: RepIndivGraphsModel,

  flgRepCommonDone: boolean,
  flgIndivGraphDone: boolean,
}


const initialState: AnalyticState = {
  dateFrom: '',
  dateTo:   '',
  dataRepCommon: [],
  dataIndivGraphs: {datasets:[], labels:[]},

  flgRepCommonDone: false,
  flgIndivGraphDone: false,
}

//
const analyticReducer = createSlice({
  name: 'analyticReducer',
  initialState: initialState,
  reducers: {
    // dates
    setDateFrom(state, action: PayloadAction<string>) {
      state.dateFrom = action.payload;
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.dateTo = action.payload;
    },

    // rep common
    setdataRepCommon(state, action: PayloadAction<RepCommonModel[]>) {
      state.dataRepCommon = action.payload;
    },
    // individual graphs
    setdataIndivGraphs(state, action: PayloadAction<RepIndivGraphsModel>) {
      state.dataIndivGraphs = action.payload;
    },    

    // statuses
    setflgRepCommonDone(state, action: PayloadAction<boolean>) {
      state.flgRepCommonDone = action.payload;
    },  
    setflgIndivGraphDone(state, action: PayloadAction<boolean>) {
      state.flgIndivGraphDone = action.payload;
    },          
  }
})

export const actionsAnalyticRed = analyticReducer.actions;
export default analyticReducer.reducer;

// ----------------------------------------------------------

export const bgCol: string[] = [
  '#FFFF00','#0000FF','#FF7F00','#00FF00','#4B0082','#9400D3','#FF0000',
  '#0048BA','#B0BF1A','#7CB9E8','#C0E8D5','#B284BE','#72A0C1','#EDEAE0','#DB2D43','#FF91AF',
  '#C46210','#EFDECD','#E52B50','#E52B50','#3B7A57','#915C83','#D0FF14','#007FFF','#318CE7',
];

// chart options
export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
  scales: {
    y: {
      suggestedMin: 0
    }
  }
};


export const datesSetupOther = createAsyncThunk(
  'analytic/datesSetup',
  async (obj: {}, thunkAPI) => {
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/analytic_params');
    let data = await resp.json();
    thunkAPI.dispatch( actionsAnalyticRed.setDateFrom(data.date_from) );
    thunkAPI.dispatch( actionsAnalyticRed.setDateTo(data.date_to) );
  }
)

export const fetchCommonGraphsStore = createAsyncThunk(
  'analytic/CommonGraph',
  async(obj: RequestRepCommModel, thunkAPI) => {
    thunkAPI.dispatch( actionsAnalyticRed.setflgRepCommonDone(false));
    let url = process.env.REACT_APP_BASE_URL + `/api/v1/common_graphs/${obj.dateFrom}/${obj.dateTo}`;
    //console.log(url);
    let resp = await fetch(url); //, {method: 'GET'}
    let dataJson: RepCommonModel[] = await resp.json();
    //console.log('fetchCommonGraphsStore=', dataJson)
    //
    let lngth = bgCol.length;
    let dataJson2: RepCommonModel[] = dataJson.map( (elem, index) => {
      return {
          ...elem, 
          data2: {
            label: elem.chart_name,
            data: elem.data, 
            backgroundColor: bgCol[index % lngth],
            borderColor: bgCol[index % lngth]
          }
      }
    })
    //
    thunkAPI.dispatch( actionsAnalyticRed.setdataRepCommon(dataJson2));
    thunkAPI.dispatch( actionsAnalyticRed.setflgRepCommonDone(true));
  }
)


export const fetchIndividualgraphsStore = createAsyncThunk(
  'analytic/IndividualGraphs',
  async (obj: RequestRepCommModel, thunkAPI) => {
    thunkAPI.dispatch( actionsAnalyticRed.setflgIndivGraphDone(false));
    let resp = await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/individual_graphs/${obj.dateFrom}/${obj.dateTo}`, {method: 'GET'});
    let dataJson: RepIndivGraphsModel = await resp.json();
    //console.log('activ4 data = ', dataJson);
    //
    let lngth = bgCol.length;
    let datasetsMod = dataJson.datasets.map( (elem, index) => {
      return {
        ...elem, 
        data: elem.data.map( (item) => (item === 0) ? null : item ),
        backgroundColor: bgCol[index % lngth],
        borderColor: bgCol[index % lngth],
        skipNull: true,
      }
    })    
    dataJson.datasets = datasetsMod;
    //
    thunkAPI.dispatch( actionsAnalyticRed.setdataIndivGraphs(dataJson));
    thunkAPI.dispatch( actionsAnalyticRed.setflgIndivGraphDone(true));
  }
)





