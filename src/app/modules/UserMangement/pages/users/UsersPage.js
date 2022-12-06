import React from "react"
import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { UsersUIProvider } from "./UsersUIContext"
import { UsersEditDialog } from "./users-edit-dialog/UsersEditDialog"
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog"
import { UsersCard } from "./users-card/UsersCard"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Welcome from "../users/test"

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
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/users/read-all-users/new")
    },
    openEditUserDialog: (id) => {
      history.push(`/users/read-all-users/${id}/edit`)
    },
    openDeleteUserDialog: (id) => {
      history.push(`/users/read-all-users/${id}/delete`)
    },
    openReadUserDialog: (id, isUserRead) => {
      history.push(`/users/read-all-users/${id}/read`)
    },
  }
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
              history.push("/users/read-all-users")
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
              history.push("/users/read-all-users")
            }}
          />
        )}
      </Route>

      {/* <Route path="/users/read-all-users/:id/read">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/users/read-all-users")
            }}
          />
        )}
      </Route> */}
      <Route path="/users/read-all-users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/read-all-users")
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
  )
}
