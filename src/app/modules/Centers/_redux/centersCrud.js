import axios from "axios"

export const USERS_URL = process.env.REACT_APP_API_URL

//Create user
export function createRequest(body) {
  // console.log("CreateUser", body)
  return axios.post(`${USERS_URL}/centers/create-center`, body)
}

// Read
export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/centers/read-all-centers`, body)
}

export function getById(id) {
  // console.log("getUserById id", id)
  return axios.post(`${USERS_URL}/centers/read-center`, id)
}

//Update
export function updateRequest(user) {
  // console.log("updateUser", user)
  return axios.put(`${USERS_URL}/centers/update-center`, user)
}

//Delete
export function deleteRequest(body) {
  return axios.patch(`${USERS_URL}/centers/delete-center`, body)
}

//Get Vehice By Center ID

export function getVehiclesById(body) {
  return axios.post(
    `${USERS_URL}/vehicledetails/read-all-vehicles-by-centerId`,
    body
  )
}
// //get All Roles
// export function getAllRoles() {
//   return axios.get(`${USERS_URL}/settings/read-all-roles-master-data`)
// }

// //get All Centers

// export function getAllCenters() {
//   return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`)
// }
