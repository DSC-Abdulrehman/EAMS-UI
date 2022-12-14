import * as requestFromServer from "./usersCrud"
import { usersSlice, callTypes } from "./usersSlice"
import { toast } from "react-toastify"

const { actions } = usersSlice
// const { roleActions } = getAllrolesSlice

export const fetchUsers = (queryparm) => async (dispatch) => {
  //console.log("Receive QP", queryparm)
  dispatch(actions.startCall({ callType: callTypes.list }))

  return requestFromServer
    .getAllUsers(queryparm)
    .then((response) => {
      //console.log("User Fetch Response is: ", response)
      
      //console.log("User response: ", totalResult)
      dispatch(actions.usersFetched(response))
    })
    .catch((error) => {
      //console.log("Can't find user", error)
      error.clientMessage = "Can't find customers"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getUserById({ id: id })
    .then((response) => {
      const entities = response.data?.data
      dispatch(actions.userFetched({ userForEdit: entities }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteUser({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.userDeleted({ id: id }))
      toast.success(response.data.message + " Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      error.clientMessage = "can't delete user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
      toast.error("Error 😣")
    })
}

export const createUser = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  userForCreation.phNo = userForCreation.phNo.toString()
  userForCreation.cnic = userForCreation.cnic.toString()
  console.log(userForCreation)
  return requestFromServer
    .createUser(userForCreation)
    .then((res) => {
      const user = res.data?.data
      dispatch(actions.userCreated({ user }))
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      error.clientMessage = "Can't create user"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
      toast.error(error.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
}

export const updateUser = (user) => (dispatch) => {
  //console.log("updatedUser data", user)
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateUser(user)
    .then((response) => {
      const updatedUser = response.data?.data
      // console.log("userAction Res", response)
      dispatch(actions.userUpdated({ updatedUser }))
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch((error) => {
      // console.log("error User update", error)
      //error.clientMessage = "Can't update User"
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const fetchRoles = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))

  return requestFromServer
    .getAllRoles()
    .then((response) => {
      const entities = response.data?.data
      // console.log("User entities: ", entities)
      dispatch(actions.RolesFetched(entities))
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchCenters = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer.getAllCenters().then((response) => {
    const entities = response.data?.data
    dispatch(actions.CentersFetched(entities))
  })
}
