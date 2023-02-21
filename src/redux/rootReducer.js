import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { usersSlice } from "../app/modules/UserMangement/_redux/usersSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { rolesSlice } from "../app/modules/Settings/_redux/roles/rolesSlice";
import { centersSlice } from "../app/modules/Centers/_redux/centersSlice";
import { vehiclesSlice } from "../app/modules/Vehicles/_redux/vehiclesSlice";
import { incidentSlice } from "../app/modules/IncidentDetails/_redux/incidents/incidentSlice";
import { TriplogSlice } from "../app/modules/IncidentDetails/_redux/triplogs/triplogSlice";
import { dashboardSlice } from "../_metronic/redux/dashboardSlice";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  dashboard: dashboardSlice.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  users: usersSlice.reducer,
  roles: rolesSlice.reducer,
  centers: centersSlice.reducer,
  vehicles: vehiclesSlice.reducer,
  incidentDetails: incidentSlice.reducer,
  triplogs: TriplogSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
