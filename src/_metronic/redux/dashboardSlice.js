import { createSlice } from "@reduxjs/toolkit";

const initialDashboardState = {
  listLoading: false,
  allCenters: [],
  allSubCenter: [],
  allCountry: [],
  allCity: [],
  cityCenters: [],
  allVehicles: [],
  standBy: [],
  onDuty: [],
  offDuty: [],
  lastTrips: [],
  alarmTime: [],
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    AllCentersFetch: (state, action) => {
      state.allCenters = action.payload;
    },
    AllSubCenterFetch: (state, action) => {
      state.allSubCenter = action.payload;
    },
    AllCountryFetch: (state, action) => {
      state.allCountry = action.payload;
    },
    AllCityFetch: (state, action) => {
      state.allCity = action.payload;
    },
    AllCentersByCityIdFetch: (state, action) => {
      state.cityCenters = action.payload;
    },
    AllVehiclesByCenterAndSubCenterId: (state, action) => {
      state.allVehicles = action.payload;
    },
    dashboardVehicles: (state, action) => {
      state.standBy = action.payload.standBy;
      state.onDuty = action.payload.onDuty;
      state.offDuty = action.payload.offDuty;
    },
    lastTripsVehicles: (state, action) => {
      // console.log("Payload", action.payload);
      state.lastTrips = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    updateData: (state, action) => {
      console.log("action payload", action.payload);
      const { id, fieldName, value } = action.payload;
      const rowIndex = state.lastTrips.findIndex((row) => row.id === id);
      state.lastTrips[rowIndex] = action.payload;
    },
    AlaramTime: (state, action) => {
      state.alarmTime = action.payload;
    },
  },
});
