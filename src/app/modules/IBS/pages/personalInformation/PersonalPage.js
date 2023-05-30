import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { PersonalInformationUIProvider } from "./PersonalUIContext";
import { InfoEditDialog } from "./info-edit-dialog/InfoEditDialog";
import { InfoDeleteDialog } from "./info-delete-dialog/InfoDeleteDialog";
import { InfoActiveDialog } from "./info-active-dialog/InfoActiveDialog";
import { InfoCard } from "./info-card/infoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/info-personal/infoActions";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import { fetchUserStatusTypes } from "../../../UserMangement/_redux/usersActions";

export function PersonalPage({ history }) {
  const dispatch = useDispatch();
  dispatch(fetchUserStatusTypes({ ibs: true }));
  const centersUIEvents = {
    addNewButtonClick: () => {
      dispatch(actions.fetchInfoById());
      history.push("/ibs/read-all-ibforms/new");
    },
    openEditDialog: (id) => {
      dispatch(actions.fetchInfoById(id));
      history.push(`/ibs/read-all-ibforms/${id}/edit`);
    },
    openDeleteDialog: (id, status) => {
      history.push(`/ibs/read-all-ibforms/${id}/${status}/delete`);
    },
    openActiveDialog: (id) => {
      history.push(`/ibs/read-all-ibforms/${id}/active`);
    },
    openReadDialog: (id, isUserRead) => {
      dispatch(actions.fetchInfoById(id));
      history.push(`/ibs/read-all-ibforms/${id}/read`);
    },
    makePDFreport: (id) => {
      history.push(`/ibs/read-all-ibforms/report`);
    },
  };
  return (
    <PersonalInformationUIProvider centersUIEvents={centersUIEvents}>
      <Route exact path="/ibs/read-all-ibforms/new">
        {({ history, match }) => (
          <InfoEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-ibforms");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-ibforms/:id/edit">
        {({ history, match }) => (
          <InfoEditDialog
            show={match != null}
            id={match && match.params.id}
            isEdit={true}
            onHide={() => {
              history.push("/ibs/read-all-ibforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-ibforms/:id/read">
        {({ history, match }) => (
          <InfoEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/ibs/read-all-ibforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-ibforms/:id/:status/delete">
        {({ history, match }) => (
          <InfoDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-ibforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-ibforms/:id/active">
        {({ history, match }) => (
          <InfoActiveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ibs/read-all-ibforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-ibforms/report">{/* <MyDocument /> */}</Route>
      <InfoCard />
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
    </PersonalInformationUIProvider>
  );
}
