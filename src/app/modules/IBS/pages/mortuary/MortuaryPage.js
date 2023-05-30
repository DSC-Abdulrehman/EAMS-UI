import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { MortuaryUIProvider } from "./MortuaryUIContext";
import { MortuaryEditDialog } from "./mortuary-edit-dialog/MortuaryEditDialog";
import { MortuaryDeleteDialog } from "./mortuary-delete-dialog/MortuaryDeleteDialog";
import { MortuaryActiveDialog } from "./mortuary-active-dialog/MortuaryActiveDialog";
import { MortuaryCard } from "./mortuary-card/MortuaryCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/subcenters/subCentersActions";
import { fetchAllCenters } from "../../../../../_metronic/redux/dashboardActions";

export function MortuaryPage({ history }) {
  const dispatch = useDispatch();
  const centersUIEvents = {
    newCenterButtonClick: () => {
      dispatch(actions.fetchCenter());
      dispatch(fetchAllCenters());
      history.push("/ibs/read-all-mortuary-list/new");
    },
    openEditCenterDialog: async (id) => {
      dispatch(actions.fetchCenter(id));
      dispatch(fetchAllCenters());
      history.push(`/ibs/read-all-mortuary-list/${id}/edit`);
    },
    openDeleteCenterDialog: (id, status) => {
      history.push(`/ibs/read-all-mortuary-list/${id}/${status}/delete`);
    },
    openActiveCenterDialog: (id) => {
      history.push(`/ibs/read-all-mortuary-list/${id}/active`);
    },
    openReadCenterDialog: (id, isUserRead) => {
      dispatch(actions.fetchCenter(id));
      dispatch(fetchAllCenters());
      history.push(`/ibs/read-all-mortuary-list/${id}/read`);
    },
  };
  return (
    <MortuaryUIProvider centersUIEvents={centersUIEvents}>
      <Route exact path="/ibs/read-all-mortuary-list/new">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-mortuary-list");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuary-list/:id/edit">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            id={match && match.params.id}
            isEdit={true}
            onHide={() => {
              dispatch(actions.fetchCenter());
              // dispatch(fetchAllCity());
              history.push("/ibs/read-all-mortuary-list");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuary-list/:id/read">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/ibs/read-all-mortuary-list");
            }}
          />
        )}
      </Route>

      <Route path="/ibs/read-all-mortuary-list/:id/:status/delete">
        {({ history, match }) => (
          <MortuaryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-mortuary-list");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuary-list/:id/active">
        {({ history, match }) => (
          <MortuaryActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-mortuary-list");
            }}
          />
        )}
      </Route>
      <MortuaryCard />
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
    </MortuaryUIProvider>
  );
}
