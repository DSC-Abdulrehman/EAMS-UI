import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { UserEditForm } from "./UsersEditForm"
import { UserEditDialogHeader } from "./UserEditDialogHeader"
import { useUsersUIContext } from "../UsersUIContext"
import * as actions from "../../../_redux/usersActions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function UsersEditDialog({ id, show, onHide, userForRead }) {
  const title = "UserEditDialog"
  const usersUIContext = useUsersUIContext()
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      queryParams: usersUIContext.queryParams,
    }
  }, [usersUIContext])

  const dispatch = useDispatch()
  const {
    actionsLoading,
    userForEdit,
    roles,
    centers,
    isuserForRead,
  } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
      isuserForRead: state.users.userForRead,
    }),
    shallowEqual
  )

  //console.log(title, userForEdit)

  useEffect(() => {
    dispatch(actions.fetchUser(id))
    dispatch(actions.fetchRoles())
    dispatch(actions.fetchCenters())
    // dispatch(actions.fetchUser(usersUIProps.queryParams))
  }, [id, dispatch])
  //console.log("userForEdit", userForEdit)
  const saveUser = (user) => {
    //console.log("CreateUserResponse", user)
    if (!id) {
      dispatch(actions.createUser(user)).then((res) => {
        //console.log("createUser response", res)
        onHide()
        //dispatch(actions.fetchUser(queryParams))
      })
    } else {
      const userUpdatedFields = {
        id: user.id,
        email: user.email,
        phNo: user.phNo,
        cnic: user.cnic,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        centerId: user.centerId,
      }
      dispatch(actions.updateUser(userUpdatedFields))
      onHide()
    }
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserEditDialogHeader id={id} isUserForRead={userForRead} />
      <UserEditForm
        saveUser={saveUser}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
        roles={roles}
        centers={centers}
        isUserForRead={userForRead}
      />
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
    </Modal>
  )
}
