import React, { Suspense } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout"
import { ItemPage } from "./vehicles"

export default function VehicleManagment() {
  // const { auth } = useSelector((auth) => auth)
  // console.log("UserManagement, Auth: ", auth)
  // const { userAccess } = auth
  // console.log("UserManagement, userAccess: ", userAccess)
  // const isAll = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 2
  // )
  //   ? true
  //   : false
  // console.log("UserManagement, isAll: ", isAll)

  // if (!isAll) {
  //   return <></>
  // }

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/" component={UsersPage} /> */}
        {
          <Redirect
            exact={true}
            from="/vehicle-details"
            to="/vehicle-details/read-all-vehicle-details"
          />
        }
        <ContentRoute
          path="/vehicle-details/read-all-vehicle-details"
          component={ItemPage}
        />
      </Switch>
    </Suspense>
  )
}
