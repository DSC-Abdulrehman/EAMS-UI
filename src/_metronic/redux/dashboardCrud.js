import axios from "axios";

export function getAllCountry() {
  return axios.get(
    "https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-countries-master-data"
  );
}

export function getAllCity(body) {
  return axios.post(
    `https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data`,
    { countryId: body }
  );
}
