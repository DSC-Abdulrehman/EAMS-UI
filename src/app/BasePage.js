import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Dashboard } from "./modules/Dashboard/pages";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import { fetchAllCountry } from "./modules/Centers/_redux/centers/centersActions";
import { fetchAllCountry } from "./modules/Dashboard/_redux/dashboardActions";
import { incidentTypes } from "./modules/Dashboard/_redux/dashboardActions";

const SettingsPage = lazy(() =>
  import("./modules/Settings/pages/SettingsPage")
);
const VehicleManagment = lazy(() => import("./modules/Vehicles/pages"));
const IncidentDetailsManagment = lazy(() =>
  import("./modules/IncidentDetails/pages")
);
const UserManagment = lazy(() => import("./modules/UserMangement/pages"));
const Centers = lazy(() => import("./modules/Centers/pages"));
const IBSModule = lazy(() => import("./modules/IBS/pages/index"));
const ROUTES = {
  settings: SettingsPage,
  users: UserManagment,
  centers: Centers,
  vehicles: VehicleManagment,
  incidentdetails: IncidentDetailsManagment,
  ibs: IBSModule,
};

export default function BasePage() {
  const dispatch = useDispatch();
  dispatch(fetchAllCountry());
  dispatch(incidentTypes());
  const auth = useSelector(({ auth }) => auth, shallowEqual);
  const UserAccess = auth?.userAccess;

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={Dashboard} />
        {/* <ContentRoute path="/ibs" component={IBSModule} /> */}
        {/* <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/all-vehicle" component={Vehicle} /> 
        {Object.keys(ROUTES).map((key)=>{
          
        })} */}
        {Object.keys(UserAccess).map((access, key) => {
          const accessName = access.replace(/ /g, "").toLowerCase();
          const path = access
            .split(" ")
            .join("-")
            .toLowerCase();
          {
            /* const accessName = access
              .split(" ")
              .join("-")
              .toLowerCase()
              { */
          }

          // console.log("access: ", { access, key, accessName })
          // console.log("Route", ROUTES[accessName])
          {
            //  }
          }

          // console.log("access: ", { access, key, accessName })
          // console.log("Route", ROUTES[accessName])
          // console.log("Path", path)

          if (ROUTES[accessName])
            return (
              <Route
                key={key}
                path={`/${path}`}
                component={ROUTES[accessName]}
              />
            );
        })}

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
