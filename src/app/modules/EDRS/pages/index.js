import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { UsersPage } from "./users/UsersPage";

export default function UserManagment() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/edrs" to="/edrs/read-all-listing" />}
        <ContentRoute path="/edrs/read-all-listing" component={UsersPage} />
      </Switch>
    </Suspense>
  );
}
