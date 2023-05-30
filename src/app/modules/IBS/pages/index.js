import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { PersonalPage } from "./personalInformation/PersonalPage";
import { MortuaryPage } from "./mortuary/MortuaryPage";

export default function IBSModule() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/" component={UsersPage} /> */}
        {<Redirect exact={true} from="/ibs" to="/ibs/read-all-ibforms" />}
        <ContentRoute path="/ibs/read-all-ibforms" component={PersonalPage} />
        {/* <ContentRoute
          path="/ibs/read-all-mortuary-list"
          component={MortuaryPage}
        /> */}
      </Switch>
    </Suspense>
  );
}
