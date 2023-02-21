import * as requestFromServer from "./dashboardCrud";
import { dashboardSlice, callTypes } from "./dashboardSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { actions } = dashboardSlice;

export const fetchAllCountry = () => async (dispatch) => {
  return await requestFromServer
    .getAllCountry()
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.AllCountryFetched(entities));
    })
    .catch((error) => {
      toast("Something went wrong");
    });
};

export const fetchAllCity = (body) => async (dispatch) => {
  return await requestFromServer
    .getAllCity(body)
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.allCitiesFetched(entities));
    })
    .catch((error) => {
      console.error(error);
      toast("error");
    });
};
