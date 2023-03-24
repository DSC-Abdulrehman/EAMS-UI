import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchDashboardVehicles,
  fetchAllCityCenters,
} from "../../redux/dashboardActions";
import { TilesWidget1, TilesWidget10 } from "../widgets";
import CreateIncidentDialog from "../widgets/modal/CreateIncidentDialog";
//import { IncidentsEditDialog } from "../../../app/modules/IncidentDetails/pages/incidents/incident-edit-dialog/IncidentEditDialog";
import { IncidentCreateDialog } from "../widgets/modal/incident-create-dialog/IncidentCreateDialog";
import { TripLogEditDialog } from "../../../app/modules/IncidentDetails/pages/triplogs/triplog-edit-dialog/TripLogEditDialog";

export function Demo2Dashboard() {
  const dispatch = useDispatch();
  const [city, setCity] = useState([]);
  const [center, setCenter] = useState([]);
  const [subCenter, setSubcenter] = useState([]);
  const [standByvehicles, setStandbyVehicels] = useState([]);
  const [onDutyVehicles, setOnDutyVehicels] = useState([]);
  const [offDutyVehicles, setOffDutyVehicels] = useState([]);

  const [vehicle, setVehicle] = useState([]);

  const [open, setOpen] = useState(false);
  const [openCloseTripDialogue, setCloseTripDialogue] = useState(false);

  const { dashboard, auth } = useSelector((state) => state);
  const { user } = auth;

  let history = useHistory();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   // console.log("Set interval called");
    //   dispatch(fetchDashboardVehicles({ cityId: user.cityId }));
    //   dispatch(fetchAllCityCenters(user.cityId));
    // }, 2500);

    // return () => clearInterval(interval);

    dispatch(fetchDashboardVehicles({ cityId: user.cityId }));
    dispatch(fetchAllCityCenters(user.cityId));
  }, [user.cityId]);

  useEffect(() => {
    const getSeletedCity = dashboard.allCity.filter(
      (item) => item.value === user.cityId
    );
    setCity(getSeletedCity[0]);
  }, [dashboard.allCity]);

  useEffect(() => {
    setStandbyVehicels(dashboard.standBy);
  }, [dashboard.standBy, dispatch]);

  useEffect(() => {
    setOnDutyVehicels(dashboard.onDuty);
  }, [dashboard.onDuty]);

  useEffect(() => {
    setOffDutyVehicels(dashboard.offDuty);
  }, [dashboard.offDuty]);

  // Function for create incident Dialogue
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Function for close Trip dialogue
  const openTripcloseDialogue = () => {
    setCloseTripDialogue(true);
  };

  const handleCloseDialoge = () => {
    setCloseTripDialogue(false);
  };

  //console.log("openCloseTripDialogue", openCloseTripDialogue);

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
            setSubcenter={setSubcenter}
            center={center}
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
            setVehicle={setVehicle}
            vehicle={vehicle}
          />
          <TripLogEditDialog
            show={openCloseTripDialogue}
            onHide={() => setCloseTripDialogue(false)}
            id={25}
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="Off Duty"
            buttonHeading="Active vehicle"
            NoofVehicle={offDutyVehicles.length}
            vehiclesData={offDutyVehicles}
          />
        </div>
      </div>
    </>
  );
}
