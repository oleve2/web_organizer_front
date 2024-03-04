import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store"; 

// utils

// models
import { CalendarData, CalendarItemR, CalendarMode } from "../models/models"; 


interface CalendarState {
  today: string,
  YearMonth: string,
  calendMode: CalendarMode,
  isCalendarFormActive: boolean,
  calendarItemActive: CalendarData,
  arrCalendarItems: CalendarItemR[][],
}

export const calDataEmpty: CalendarData = {
  id: 0, date: '', name: '', time_from: '', time_to: '', status: '',
}

const makeToday = (): string => {
  let d = new Date();
  let d_start = makeYearMonth();
  let td = d.getDate().toString();
  d_start = d_start + "-" +  ((td.length === 1) ? "0"+td : td);
  return d_start;
}

const makeYearMonth = () => {
  let d = new Date();
  let year = d.getFullYear().toString();
  let month = (d.getMonth() + 1).toString();
  return year + "-" + ((month.length === 1) ? "0"+month : month);
}

const initialState: CalendarState = {
  today: makeToday(),
  YearMonth: makeYearMonth(),
  calendMode: CalendarMode.calendar,
  isCalendarFormActive: false,
  calendarItemActive: calDataEmpty,
  arrCalendarItems: [],
}

const calendarReducer = createSlice({
  name: 'calendarReducer',
  initialState: initialState,
  reducers: {
    set_today(state, action: PayloadAction<string>) {
      state.today = action.payload;
    },  
    set_YearMonth(state, action: PayloadAction<string>) {
      state.YearMonth = action.payload;
    },  
    
    set_calendMode(state, action: PayloadAction<CalendarMode>) {
      state.calendMode = action.payload;
    },  
    set_isCalendarFormActive(state, action: PayloadAction<boolean>) {
      state.isCalendarFormActive = action.payload;
    },
    set_calendarItem(state, action: PayloadAction<CalendarData>) {
      state.calendarItemActive = action.payload;
    },   

    set_arrCalendarItems(state, action: PayloadAction<CalendarItemR[][]>) {
      state.arrCalendarItems = action.payload;
    },   
  }
})


export const actionsCalendRed = calendarReducer.actions;
export default calendarReducer.reducer;


export const fetchCalendarGrid = createAsyncThunk(
  'calendar/fetchCalendarGrid',
  async (obj: Object, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/calendar_grid_by_month', {
      method: 'POST',
      body: JSON.stringify({year_month: appState.calendarReducer.YearMonth})
    });
    let data: CalendarItemR[][] = await resp.json();
    //console.log('tags data=', data);
    thunkAPI.dispatch(actionsCalendRed.set_arrCalendarItems(data));
  }
)

//export const fetchCelendarItemList = createAsyncThunk('calendar/fetchCelendarItemList', async (obj: Object, thunkAPI) => {})
/**/
export const fetchCelendarItemList = async () => {
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/calendar_items_nofiltered');
  let data: CalendarData[] = await resp.json();
  return data;
}


export const insertCelendarItem = createAsyncThunk(
  'calendar/insertCelendarItem',
  async(obj: CalendarData, thunkAPI) => {
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/calendar_insertOne', {
      method: 'POST',
      body: JSON.stringify(obj)
    });
  }
)

export const updateCelendarItem = createAsyncThunk(
  'calendar/updateCelendarItem',
  async(obj: CalendarData, thunkAPI) => {
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/calendar_updateOne', {
      method: 'POST',
      body: JSON.stringify(obj)
    });
  }
)

export const deleteCelendarItem = createAsyncThunk(
  'calendar/deleteCelendarItem',
  async(obj: Number, thunkAPI) => {
    await fetch(process.env.REACT_APP_BASE_URL + `/api/v1/calendar_deleteOne/${obj}`, {
      method: 'POST',
      body: JSON.stringify(obj)
    });
  }
)



