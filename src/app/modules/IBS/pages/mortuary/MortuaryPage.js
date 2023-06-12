import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { MortuaryUIProvider } from "./MortuaryUIContext";
import { MortuaryEditDialog } from "./mortuary-edit-dialog/MortuaryEditDialog";
import { MortuaryDeleteDialog } from "./mortuary-delete-dialog/MortuaryDeleteDialog";
import { MortuaryActiveDialog } from "./mortuary-active-dialog/MortuaryActiveDialog";
import { CoffinEditDialog } from "./coffin-edit-dialog/CoffinEditDialog";
import { MortuaryCard } from "./mortuary-card/MortuaryCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/mortuary/reduxActions";
import { fetchUserStatusTypes } from "../../../UserMangement/_redux/usersActions";
import { ImageSliderDialog } from "./image-slider-dialog/ImageSliderDialog";

export function MortuaryPage({ history }) {
  const dispatch = useDispatch();
  dispatch(
    fetchUserStatusTypes({
      filter: {
        mf: true,
      },
    })
  );
  const moduleUIEvents = {
    addNewButtonClick: () => {
      history.push("/ibs/read-all-mortuaryforms/new");
    },
    openEditDialog: (ibfId, id) => {
      dispatch(actions.fetchInfoById(id));
      history.push(`/ibs/read-all-mortuaryforms/${id}/edit`);
    },
    openDeleteDialog: (id, status) => {
      history.push(`/ibs/read-all-mortuaryforms/${id}/${status}/delete`);
    },
    openActiveDialog: (id) => {
      history.push(`/ibs/read-all-mortuaryforms/${id}/active`);
    },
    openReadDialog: (id, isUserRead) => {
      dispatch(actions.fetchInfoById(id));
      history.push(`/ibs/read-all-mortuaryforms/${id}/read`);
    },
    openAddCoffinDialog: (ibfId, mfId) => {
      dispatch(actions.fetchInfoById(mfId));
      history.push(`/ibs/read-all-mortuaryforms/${ibfId}/${mfId}/add-coffin`);
    },
    openImageSlider: () => {
      history.push(`/ibs/read-all-mortuaryforms/slider`);
    },
  };
  return (
    <MortuaryUIProvider moduleUIEvents={moduleUIEvents}>
      <Route exact path="/ibs/read-all-mortuaryforms/new">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-mortuaryforms");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/:id/edit">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-mortuaryforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/:id/read">
        {({ history, match }) => (
          <MortuaryEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/ibs/read-all-mortuaryforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/:id/:status/delete">
        {({ history, match }) => (
          <MortuaryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-mortuaryforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/:id/active">
        {({ history, match }) => (
          <MortuaryActiveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ibs/read-all-mortuaryforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/:ibfId/:mfId/add-coffin">
        {({ history, match }) => {
          return (
            <CoffinEditDialog
              show={match != null}
              onHide={() => history.push("/ibs/read-all-mortuaryforms")}
            />
          );
        }}
      </Route>
      <Route path="/ibs/read-all-mortuaryforms/slider">
        {({ history, match }) => {
          return <ImageSliderDialog show={match != null} onHide={() => {}} />;
        }}
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
