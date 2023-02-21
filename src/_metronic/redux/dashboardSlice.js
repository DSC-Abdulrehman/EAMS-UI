import { createSlice } from "@reduxjs/toolkit";

const initialDashboardState = {
  AllCountry: [],
  AllCity: [],
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    AllCountryFetched: (state, action) => {
      state.AllCountry = action.payload;
    },
    allCitiesFetched: (state, action) => {
      state.AllCity = action.payload;
    },
  },
});
