import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ItemUIProvider } from "./ItemUIContext";
import { ItemEditDialog } from "./item-edit-dialog/ItemEditDialog";
import { ItemDeleteDialog } from "./item-delete-dialog/ItemDeleteDialog";
import { ItemsCard } from "./items-card/ItemsCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchVehicle,
  fetchCenters,
  fetchCategory,
} from "../../_redux/vehiclesActions";

export function ItemPage({ history }) {
  const dispatch = useDispatch();
  const { itemForEdit } = useSelector(
    (state) => ({
      itemForEdit: state.vehicles.itemForEdit,
    }),
    shallowEqual
  );
  // const { auth } = useSelector((auth) => auth)
  // console.log("UserManagement, Auth: ", auth)
  // const { userAccess } = auth
  // console.log("UserManagement, userAccess: ", userAccess)
  // const isAdd = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 5
  // )
  //   ? true
  //   : false
  // const isEdit = userAccess["Settings"]?.find(
  //   (access) => access.resourceId == 4
  // )
  //   ? true
  //   : false
  // console.log("UserManagement, isAdd: ", isAdd)
  // const ForRead = false
  const itemUIEvents = {
    newCenterButtonClick: () => {
      dispatch(fetchVehicle(0));

      history.push("/vehicle-details/read-all-vehicle-details/new");
    },
    openEditCenterDialog: (id) => {
      dispatch(fetchVehicle(id));
      history.push(`/vehicle-details/read-all-vehicle-details/${id}/edit`);
    },
    openDeleteCenterDialog: (id) => {
      history.push(`/vehicle-details/read-all-vehicle-details/${id}/delete`);
    },
    openReadCenterDialog: (id, isUserRead) => {
      dispatch(fetchVehicle(id));
      history.push(`/vehicle-details/read-all-vehicle-details/${id}/read`);
    },
  };
  return (
    <ItemUIProvider itemUIEvents={itemUIEvents}>
      <Route exact path="/vehicle-details/read-all-vehicle-details/new">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            onHide={() => {
              history.push("/vehicle-details/read-all-vehicle-details");
            }}
          />
        )}
      </Route>
      <Route path="/vehicle-details/read-all-vehicle-details/:id/edit">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              dispatch(fetchVehicle(0));
              history.push("/vehicle-details/read-all-vehicle-details");
            }}
          />
        )}
      </Route>
      <Route path="/vehicle-details/read-all-vehicle-details/:id/read">
        {({ history, match }) => (
          <ItemEditDialog
            show={match != null}
            id={match && match.params.id}
            itemForRead={true}
            onHide={() => {
              dispatch(fetchVehicle(0));
              history.push("/vehicle-details/read-all-vehicle-details");
            }}
          />
        )}
      </Route>
      <Route path="/vehicle-details/read-all-vehicle-details/:id/delete">
        {({ history, match }) => (
          <ItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/vehicle-details/read-all-vehicle-details");
            }}
          />
        )}
      </Route>
      {/* {isAdd && (
        <Route exact path="/list/new">
          {({ history, match }) => (
            <UsersEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )}
      {isEdit && (
        <Route exact path="/list/edit">
          {({ history, match }) => (
            <UsersEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )} */}
      <ItemsCard />
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
    </ItemUIProvider>
  );
}
