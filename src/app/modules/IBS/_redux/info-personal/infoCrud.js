import axios from "axios";
import moment from "moment";
import { func } from "prop-types";

export const USERS_URL = process.env.REACT_APP_API_URL;

export function getAllHospital(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-hospitals-master-data`,
    body
  );
}

export function getAllPoliceStations(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-police-stations-master-data`,
    body
  );
}
export async function createRequest(body) {
  // console.log("body", body);
  const formData = new FormData();
  if (body.images) {
    body.images.forEach((element) => {
      formData.append("images", element);
    });
  }
  if (body.countryId) {
    formData.append("countryId", body.countryId);
  }
  if (body.cityId) {
    formData.append("cityId", body.cityId);
  }
  if (body.incidentTypeId) {
    formData.append("incidentTypeId", body.incidentTypeId);
  }
  if (body.districtId) {
    formData.append("districtId", body.districtId);
  }
  if (body.areaId) {
    formData.append("areaId", body.areaId);
  }
  if (body.bodyType) {
    formData.append("bodyType", body.bodyType);
  }
  if (body.vehicleType) {
    formData.append("vehicleType", body.vehicleType);
  }
  if (body.statusId) {
    formData.append("statusId", body.statusId);
  }
  if (body.age) {
    formData.append("age", body.age);
  }
  if (body.callerCnic) {
    formData.append("callerCnic", body.callerCnic);
  }
  if (body.callerName) {
    formData.append("callerName", body.callerName);
  }
  if (body.callerPhNo) {
    formData.append("callerPhNo", body.callerPhNo);
  }
  if (body.dateTime) {
    body.dateTime = moment(body.dateTime).format("DD.MM.YYYY HH:mm");
    formData.append("dateTime", body.dateTime);
  }
  if (body.description) {
    formData.append("description", body.description);
  }
  if (body.gender) {
    formData.append("gender", body.gender);
  }
  if (body.hospitalId) {
    formData.append("hospitalId", body.hospitalId);
  }
  if (body.hospitalReachdateTime) {
    body.hospitalReachdateTime = moment(body.hospitalReachdateTime).format(
      "DD.MM.YYYY HH:mm"
    );
    formData.append("hospitalReachdateTime", body.hospitalReachdateTime);
  }
  if (body.incidentAddress) {
    formData.append("incidentAddress", body.incidentAddress);
  }
  if (body.incidentlocationReachdateTime) {
    body.incidentlocationReachdateTime = moment(
      body.incidentlocationReachdateTime
    ).format("DD:MM:YYYY HH:mm");
    formData.append(
      "incidentlocationReachdateTime",
      body.incidentlocationReachdateTime
    );
  }
  if (body.patientName) {
    formData.append("patientName", body.patientName);
  }
  if (body.policeStationId) {
    formData.append("policeStationId", body.policeStationId);
  }
  if (body.VehcileId) {
    formData.append("vehicleId", body.VehcileId);
  }
  if (body.vehicleRegNo) {
    formData.append("vehicleRegNo", body.vehicleRegNo);
  }
  try {
    const response = await axios.post(
      `${USERS_URL}/ibs/create-ibform`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
    // Handle success
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const getVehiclesByCenterAndSubcenterId = async (body) => {
  return await axios.post(
    `${USERS_URL}/settings/read-all-vehicles-by-centerId-master-data`,
    body
  );
};

export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/ibs/read-all-ibforms`, body);
}

export const getById = async (id) => {
  // console.log("getUserById id", id)
  return await axios.post(`${USERS_URL}/ibs/read-ibform`, id);
};

export async function updateRequest(body) {
  console.log("body", body);
  const formData = new FormData();
  if (body.id) {
    formData.append("id", body.id);
  }
  if (body.images) {
    body.images.forEach((element) => {
      formData.append("images", element);
    });
  }
  if (body.countryId) {
    formData.append("countryId", body.countryId);
  }
  if (body.cityId) {
    formData.append("cityId", body.cityId);
  }
  if (body.incidentTypeId) {
    formData.append("incidentTypeId", body.incidentTypeId);
  }
  if (body.districtId) {
    formData.append("districtId", body.districtId);
  }
  if (body.areaId) {
    formData.append("areaId", body.areaId);
  }
  if (body.bodyType) {
    formData.append("bodyType", body.bodyType);
  }
  if (body.vehicleType) {
    formData.append("vehicleType", body.vehicleType);
  }
  if (body.statusId) {
    formData.append("statusId", body.statusId);
  }
  if (body.age) {
    formData.append("age", body.age);
  }
  if (body.callerCnic) {
    formData.append("callerCnic", body.callerCnic);
  }
  if (body.callerName) {
    formData.append("callerName", body.callerName);
  }
  if (body.callerPhNo) {
    formData.append("callerPhNo", body.callerPhNo);
  }
  if (body.dateTime) {
    body.dateTime = moment(body.dateTime).format("DD.MM.YYYY HH:mm");
    formData.append("dateTime", body.dateTime);
  }
  if (body.description) {
    formData.append("description", body.description);
  }
  if (body.gender) {
    formData.append("gender", body.gender);
  }
  if (body.hospitalId) {
    formData.append("hospitalId", body.hospitalId);
  }
  if (body.hospitalReachdateTime) {
    body.hospitalReachdateTime = moment(body.hospitalReachdateTime).format(
      "DD.MM.YYYY HH:mm"
    );
    formData.append("hospitalReachdateTime", body.hospitalReachdateTime);
  }
  if (body.incidentAddress) {
    formData.append("incidentAddress", body.incidentAddress);
  }
  if (body.incidentlocationReachdateTime) {
    body.incidentlocationReachdateTime = moment(
      body.incidentlocationReachdateTime
    ).format("DD:MM:YYYY HH:mm");
    formData.append(
      "incidentlocationReachdateTime",
      body.incidentlocationReachdateTime
    );
  }
  if (body.patientName) {
    formData.append("patientName", body.patientName);
  }
  if (body.policeStationId) {
    formData.append("policeStationId", body.policeStationId);
  }
  if (body.VehcileId) {
    formData.append("vehicleId", body.VehcileId);
  }
  if (body.vehicleRegNo) {
    formData.append("vehicleRegNo", body.vehicleRegNo);
  }
  if (body.oldImages) {
    body.oldImages.forEach((element) => {
      formData.append("oldImages", element);
    });
  }
  // if (body.oldImages) {
  //   // const oldImages = [];
  //   // body.oldImages.map((item) => oldImages.push(item));
  //   formData.append("oldImages", JSON.stringify(body.oldImages));
  // }
  try {
    const response = await axios.patch(
      `${USERS_URL}/ibs/update-ibform`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
    // Handle success
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  // return axios.put(`${USERS_URL}/ibs/update-ibform`, body);
}

export function deleteRequest(body) {
  return axios.patch(`${USERS_URL}/ibs/delete-ibform`, body);
}

//Get Vehice By Center ID

export function getVehiclesById(body) {
  return axios.post(
    `${USERS_URL}/vehicles/read-all-vehicles-by-centerId`,
    body
  );
}

export function getAllCountry() {
  return axios.get(
    "https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-countries-master-data"
  );
}

export const getAllCity = async (body) => {
  return await axios.post(
    `https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data`,
    { countryId: body }
  );
};
