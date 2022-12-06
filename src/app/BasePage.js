import React, { Suspense, lazy } from "react"
import { Redirect, Switch, Route } from "react-router-dom"
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout"
import { BuilderPage } from "./pages/BuilderPage"
import { MyPage } from "./pages/MyPage"
import { DashboardPage } from "./pages/DashboardPage"
import { shallowEqual, useSelector } from "react-redux"
//import SettingsPage from "./modules/Settings/pages/SettingsPage"

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
)
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
)
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
)
const SettingsPage = lazy(() => import("./modules/Settings/pages/SettingsPage"))

const VehicleManagment = lazy(() => import("./modules/Vehicles/pages"))

const IncidentDetailsManagment = lazy(() =>
  import("./modules/IncidentDetails/pages")
)

const UserManagment = lazy(() => import("./modules/UserMangement/pages"))

const Centers = lazy(() => import("./modules/Centers/pages"))

const ROUTES = {
  settings: SettingsPage,
  users: UserManagment,
  centers: Centers,
  vehicledetails: VehicleManagment,
  incidentdetails: IncidentDetailsManagment,
}

export default function BasePage() {
  const auth = useSelector(({ auth }) => auth, shallowEqual)
  const UserAccess = auth?.userAccess

  //console.log("UserAccess on basepage, Route: ", UserAccess)
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  //console.log("UserAccess: ", UserAccess)

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        {/* <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/all-vehicle" component={Vehicle} /> 
        {Object.keys(ROUTES).map((key)=>{
          
        })} */}
        {Object.keys(UserAccess).map((access, key) => {
          const accessName = access.replace(/ /g, "").toLowerCase()
          const path = access
            .split(" ")
            .join("-")
            .toLowerCase()
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
            )
        })}

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  )
}
