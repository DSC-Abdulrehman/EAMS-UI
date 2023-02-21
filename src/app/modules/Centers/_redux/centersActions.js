import * as requestFromServer from "./centersCrud";
import { centersSlice, callTypes } from "./centersSlice";
import { toast } from "react-toastify";

const { actions } = centersSlice;
// const { roleActions } = getAllrolesSlice

export const fetchCenters = (queryparm) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllRequest(queryparm)
    .then((response) => {
      // console.log("Fetch center Response is: ", response)
      const entities = response.data?.data;
      //console.log("User entities: ", entities)
      dispatch(actions.centersFetched(entities));
    })
    .catch((error) => {
      //console.log("Can't find user", error)
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.centerFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById({ id: id })
    .then((response) => {
      //console.log("get center by Id response", response)
      const entities = response.data?.data;
      dispatch(actions.centerFetched({ centerForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRequest({ id: id })
    .then((response) => {
      //console.log("response from delete user ", response.data.message)
      dispatch(actions.centerDeleted({ id: id }));
      toast.success(response.data.message + " Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      error.clientMessage = "can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error("Error 😣");
    });
};

export const createCenter = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRequest(userForCreation)
    .then((res) => {
      const user = res.data?.data;
      dispatch(actions.centerCreated({ user }));
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error("Something went wrong..!");
    });
};

export const updateCenter = (user) => (dispatch) => {
  //console.log("updatedUser data", user)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRequest(user)
    .then((response) => {
      const updatedUser = response.data?.data;
      // console.log("userAction Res", response)
      dispatch(actions.centerUpdated({ updatedUser }));
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      // console.log("error User update", error)
      // error.clientMessage = "Can't update User"
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchVehicles = (queryparm) => (dispatch) => {
  // console.log("queryparm", queryparm);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getVehiclesById(queryparm)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.vehiclesFetched(entities));
    })
    .catch((error) => {
      error.clientMessage = "Can't get Vehicles";
    });
};

// export const fetchRoles = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))

//   return requestFromServer
//     .getAllRoles()
//     .then((response) => {
//       const entities = response.data?.data
//       // console.log("User entities: ", entities)
//       dispatch(actions.RolesFetched(entities))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find roles"
//       dispatch(actions.catchError({ error, callType: callTypes.list }))
//     })
// }

// export const fetchCenters = () => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer.getAllCenters().then((response) => {
//     const entities = response.data?.data
//     dispatch(actions.CentersFetched(entities))
//   })
// }
