import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create Vehicle
export function createRequest(body) {
  return axios.post(`${USERS_URL}/vehicledetails/create-vehicle-detail`, body);
}

// Read Vehicle
export function getAllRequest(body) {
  return axios.post(
    `${USERS_URL}/vehicledetails/read-all-vehicle-details`,
    body
  );
}
//Get Vehicle By ID
export function getById(id) {
  return axios.post(`${USERS_URL}/vehicledetails/read-vehicle-detail`, id);
}

//Update Vehicle
export function updateRequest(user) {
  return axios.put(`${USERS_URL}/vehicledetails/update-vehicle-detail`, user);
}

//Delete
export function deleteRequest(id) {
  return axios.patch(`${USERS_URL}/vehicledetails/delete-vehicle-detail`, id);
}

//get All Centers

export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`);
}

//get All Vehicle categories
export function getAllCategories() {
  return axios.get(
    `${USERS_URL}/settings/read-all-vehicles-category-master-data`
  );
}
