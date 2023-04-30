import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { CentersUIProvider } from "./CentersUIContext";
import { CenterEditDialog } from "./center-edit-dialog/CenterEditDialog";
import { CenterDeleteDialog } from "./center-delete-dialog/CenterDeleteDialog";
import { CenterActiveDialog } from "./center-active-dialog/CenterActiveDialog";
import { CentersCard } from "./centers-card/CentersCard";
import { DashboardTiles } from "./dashboard-tiles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/dashboardActions";
import { fetchAllCenters } from "../../../../../_metronic/redux/dashboardActions";
import { useCentersUIContext } from "./CentersUIContext";

export function DashboardPage({ history }) {
  const centersUIContext = useCentersUIContext();

  const dispatch = useDispatch();

  const centerForEdit = useSelector((state) => state?.centers?.centerForEdit);

  const centersUIEvents = {
    openReadLastTripsDialog: async (id) => {
      const body = {
        vehicleId: id,
        filter: {
          searchQuery: "",
        },
        sortOrder: "name",
        pageSize: 20,
        pageNumber: 1,
      };
      dispatch(actions.getLastTrips(body));
      history.push(`/dashboard/vehicle/${id}/read`);
    },
    // newCenterButtonClick: () => {
    //   dispatch(actions.fetchCenter());
    //   dispatch(fetchAllCenters());
    //   history.push("/centers/read-all-subcenters/new");
    // },
    // openEditCenterDialog: async (id) => {
    //   dispatch(actions.fetchCenter(id));
    //   dispatch(fetchAllCenters());
    //   history.push(`/centers/read-all-subcenters/${id}/edit`);
    // },
    // openDeleteCenterDialog: (id, status) => {
    //   history.push(`/centers/read-all-subcenters/${id}/${status}/delete`);
    // },
    // openActiveCenterDialog: (id) => {
    //   history.push(`/centers/read-all-subcenters/${id}/active`);
    // },
    // openReadCenterDialog: (id, isUserRead) => {
    //   dispatch(actions.fetchCenter(id));
    //   dispatch(fetchAllCenters());
    //   history.push(`/centers/read-all-subcenters/${id}/read`);
    // },
  };
  return (
    <CentersUIProvider centersUIEvents={centersUIEvents}>
      <Route path="/dashboard/vehicle/:id/read">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/dashboard/vehicle");
            }}
          />
        )}
      </Route>
      {/* <Route exact path="/centers/read-all-subcenters/new">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            onHide={() => {
              history.push("/centers/read-all-subcenters");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/centers/read-all-subcenters/:id/edit">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            id={match && match.params.id}
            isEdit={true}
            onHide={() => {
              dispatch(actions.fetchCenter());
              // dispatch(fetchAllCity());
              history.push("/centers/read-all-subcenters");
            }}
          />
        )}
      </Route>
      <Route path="/centers/read-all-subcenters/:id/read">
        {({ history, match }) => (
          <CenterEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/centers/read-all-subcenters");
            }}
          />
        )}
      </Route>

      <Route path="/centers/read-all-subcenters/:id/:status/delete">
        {({ history, match }) => (
          <CenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/centers/read-all-subcenters");
            }}
          />
        )}
      </Route>
      <Route path="/centers/read-all-subcenters/:id/active">
        {({ history, match }) => (
          <CenterActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/centers/read-all-subcenters");
            }}
          />
        )}
      </Route> */}

      <DashboardTiles />
      {/* <CentersCard /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CentersUIProvider>
  );
}
