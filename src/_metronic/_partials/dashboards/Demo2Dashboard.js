import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCity,
  fetchDashboardVehicles,
  fetchAllCityCenters,
} from "../../redux/dashboardActions";
import { TilesWidget1, TilesWidget10 } from "../widgets";
//import CreateIncidentDialog from "../widgets/modal/CreateIncidentDialog";
import { IncidentCreateDialog } from "../widgets/modal/incident-create-dialog/IncidentCreateDialog";
import { TripLogEditDialog } from "../../../app/modules/IncidentDetails/pages/triplogs/triplog-edit-dialog/TripLogEditDialog";
//import { DropdownMenu4 } from "../dropdowns";

export function Demo2Dashboard() {
  const dispatch = useDispatch();

  // All useState Hook
  const [city, setCity] = useState([]);
  const [center, setCenter] = useState([]);
  const [subCenter, setSubcenter] = useState([]);
  const [standByvehicles, setStandbyVehicels] = useState([]);
  const [onDutyVehicles, setOnDutyVehicels] = useState([]);
  const [offDutyVehicles, setOffDutyVehicels] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [seletedOnDuty, setSeletecOnDuty] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCloseTripDialogue, setCloseTripDialogue] = useState(false);
  const [closeTripId, setCloseTripId] = useState();
  const [diable, setDisable] = useState(true);
  const [diableOnDutyButton, setDisableOnDutyButton] = useState(true);

  // Getting Redux state
  const { dashboard, auth } = useSelector((state) => state);
  const { user } = auth;

  // useEffect(() => {
  //   dispatch(action.fetchAllCity(user.countryId));
  // }, [user.countryId]);
  useEffect(() => {
    //console.log("Fetch city by user id one thime");
    dispatch(fetchAllCity(user.countryId));
  }, []);

  useEffect(() => {
    console.log("seleted cit yis called");
    const getSeletedCity =
      dashboard.allCity &&
      dashboard.allCity.find((item) => {
        return item.value === user.cityId;
      });

    setCity(getSeletedCity);
  }, [dashboard.allCity]);

  useEffect(() => {
    setDisable(vehicle.length > 0 ? false : true);
  }, [vehicle]);

  useEffect(() => {
    setDisableOnDutyButton(seletedOnDuty.length > 0 ? false : true);
  }, [seletedOnDuty]);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   // console.log("Set interval called");
    //   dispatch(fetchDashboardVehicles({ cityId: user.cityId }));
    //   dispatch(fetchAllCityCenters(user.cityId));
    // }, 3000);

    // return () => clearInterval(interval);

    dispatch(fetchDashboardVehicles({ cityId: user.cityId || city.values }));
    dispatch(fetchAllCityCenters(user.cityId));
  }, []);

  useEffect(() => {
    setStandbyVehicels(dashboard.standBy);
  }, [dashboard.standBy, dispatch]);

  useEffect(() => {
    setOnDutyVehicels(dashboard.onDuty);
  }, [dashboard.onDuty]);

  useEffect(() => {
    setOffDutyVehicels(dashboard.offDuty);
  }, [dashboard.offDuty, dispatch]);

  // Fn create incident Dialogue
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Fn close Trip dialogue
  const openTripcloseDialogue = () => {
    setCloseTripDialogue(true);
    setCloseTripId(seletedOnDuty[0]);
  };

  const handleCloseDialoge = () => {
    setCloseTripDialogue(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <TilesWidget10
            className="gutter-b"
            widgetHeight="125px"
            seletCity={city}
            setCity={setCity}
            setCenter={setCenter}
            center={center}
            setSubcenter={setSubcenter}
            subCenter={subCenter}
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="Stand By"
            buttonHeading="Create Incident"
            NoofVehicle={standByvehicles.length}
            vehiclesData={standByvehicles}
            handleClickOpen={handleClickOpen}
            setVehicle={setVehicle}
            vehicle={vehicle}
            seletedCity={city}
            selectionType="checkbox"
            diable={diable}
          />
          <IncidentCreateDialog
            show={open}
            onHide={handleClose}
            handleClose={handleClose}
            selectedVehicles={vehicle}
            setStandbyVehicels={setStandbyVehicels}
            city={city && city.value}
            center={center && center.value}
            subCenter={subCenter && subCenter.value}
            setVehicle={setVehicle}
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="On Duty"
            buttonHeading="In Vehicle"
            NoofVehicle={onDutyVehicles.length}
            vehiclesData={onDutyVehicles}
            handleClickOpen={openTripcloseDialogue}
            setVehicle={setSeletecOnDuty}
            vehicle={seletedOnDuty}
            selectionType="radio"
            diable={diableOnDutyButton}
          />
          <TripLogEditDialog
            show={openCloseTripDialogue}
            onHide={() => setCloseTripDialogue(false)}
            id={closeTripId}
            cityId={user.cityId}
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="Off Duty"
            // buttonHeading="Active vehicle"
            NoofVehicle={offDutyVehicles.length}
            vehiclesData={offDutyVehicles}
            setVehicle={setVehicle}
            seletedCity={city}
            selectionType="radio"
          />
        </div>
      </div>
    </>
  );
}
