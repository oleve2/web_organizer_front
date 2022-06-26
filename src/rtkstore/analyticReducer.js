import { createSlice } from "@reduxjs/toolkit";

import { add, startOfMonth } from 'date-fns'
import { utcToZonedTime, format } from 'date-fns-tz';


const initialState = {
  dateFrom: '2022-01-01',
  dateTo:   '2022-01-01',
}

const analyticReducer = createSlice({
  name: 'analyticReducer',
  initialState: initialState,
  reducers: {
    setDateFrom(state, action) {
      state.dateFrom = action.payload;
    },
    setDateTo(state, action) {
      state.dateTo = action.payload;
    },
  }
})

export const actionsAnalyticRed = analyticReducer.actions;
export default analyticReducer.reducer;

const suppFormatMD = (d) => {
  if (d.toString().length === 1) {
    return `0${d}`;
  } else {
    return `d`;
  }
}

export function makeFourDates() {
  // current
  let d = new Date(); 
  //console.log('date=', d.toISOString());

  // month start + tz
  let dMonStart = utcToZonedTime(startOfMonth(d), 'Europe/Moscow');
  //console.log('dMonStart=', dMonStart, dMonStart.toLocaleDateString());

  // month end
  let dMonEnd = add(dMonStart, {months:1});
  //console.log('dMonEnd', dMonEnd, dMonEnd.toLocaleDateString());

  // setup
  let dfromArr = dMonStart.toLocaleDateString().split('/');
  let dtoArr = dMonEnd.toLocaleDateString().split('/');
  //console.log('dfromArr', dfromArr);
  //console.log('dtoArr', dtoArr);

  let df = dfromArr[2] + '-' + suppFormatMD(dfromArr[0]) + '-' + suppFormatMD(+dfromArr[1]);
  let dt = dtoArr[2] + '-' + suppFormatMD(dtoArr[0]) + '-' + suppFormatMD(dtoArr[1]);
  //console.log(`df=${df} dt=${dt}`);
  // -------------------
  return {
    date_from: df,
    date_to: dt
  }
}

// set initial dateFrom and dateTo
/*
export const datesSetup = () => async(dispatch) => {
  // set store values
  //let resDates = makeFourDates();
  //console.log('resDates = ', resDates);
  //dispatch( actionsAnalyticRed.setDateFrom(resDates.dateFrom) );
}
*/

export const datesSetupOther = () => async (dispatch) => {
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/analytic_params');
  let data = await resp.json();
  //console.log('data33=', data, typeof(data));
  dispatch( actionsAnalyticRed.setDateFrom(data.date_from) ); //resDates.dateFrom
  dispatch( actionsAnalyticRed.setDateTo(data.date_to) );   //resDates.dateTo   
  
}

