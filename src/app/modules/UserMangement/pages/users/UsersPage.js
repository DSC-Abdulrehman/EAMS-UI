import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersEditDialog } from "./users-edit-dialog/UsersEditDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UserActiveDialog } from "./user-active-dialog/UserActiveDialog";
import { UsersCard } from "./users-card/UsersCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "../users/test";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import { createUser } from "../../_redux/usersCrud";

export function UsersPage({ history }) {
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
  const dispatch = useDispatch();
  const usersUIEvents = {
    newUserButtonClick: () => {
      dispatch(fetchAllCountry());
      history.push("/users/read-all-users/new");
    },
    openEditUserDialog: (id) => {
      dispatch(fetchAllCountry());
      history.push(`/users/read-all-users/${id}/edit`);
    },
    openDeleteUserDialog: (id, status) => {
      history.push(`/users/read-all-users/${id}/${status}/delete`);
    },
    openActiveUserDialog: (id) => {
      history.push(`/users/read-all-users/${id}/active`);
    },
    openReadUserDialog: (id, isUserRead) => {
      dispatch(fetchAllCountry());
      history.push(`/users/read-all-users/${id}/read`);
    },
  };
  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      {/* <Route path="/users/read-all-users/${id}" >
<Welcome />

        </Route> */}

      {/* <Switch>
                <Route exact path="/users/read-all-users/${id}/edit" component={Home} />
                <Route exact path="/student" component={Student} />
            </Switch> */}
      <Route exact path="/users/read-all-users/new">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users/read-all-users");
            }}
          />
        )}
      </Route>
      <Route path="/users/read-all-users/:id/edit">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/read-all-users");
            }}
          />
        )}
      </Route>

      <Route path="/users/read-all-users/:id/read">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/users/read-all-users");
            }}
          />
        )}
      </Route>
      <Route path="/users/read-all-users/:id/:status/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/users/read-all-users");
            }}
          />
        )}
      </Route>
      <Route path="/users/read-all-users/:id/active">
        {({ history, match }) => (
          <UserActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/users/read-all-users");
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
      <UsersCard />
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
    </UsersUIProvider>
  );
}
