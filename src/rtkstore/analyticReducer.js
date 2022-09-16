import { createSlice } from "@reduxjs/toolkit";

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

export const datesSetupOther = () => async (dispatch) => {
  let resp = await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/analytic_params');
  let data = await resp.json();
  dispatch( actionsAnalyticRed.setDateFrom(data.date_from) ); //resDates.dateFrom
  dispatch( actionsAnalyticRed.setDateTo(data.date_to) );     //resDates.dateTo   
  
}

