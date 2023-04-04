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
import { DropdownMenu4 } from "../dropdowns";

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
  const [closeTripId, setCloseTripId] = useState();

  const { dashboard, auth } = useSelector((state) => state);
  const { user } = auth;

  let history = useHistory();

  //console.log("vehicle", vehicle);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   // console.log("Set interval called");
    //   dispatch(fetchDashboardVehicles({ cityId: user.cityId }));
    //   dispatch(fetchAllCityCenters(user.cityId));
    // }, 3000);

    // return () => clearInterval(interval);

    dispatch(fetchDashboardVehicles({ cityId: user.cityId || city.values }));
    dispatch(fetchAllCityCenters(user.cityId));
  }, [user.cityId]);
  console.log("vehicle", vehicle);
  useEffect(() => {
    //console.log("save city called");
    const getSeletedCity =
      dashboard.allCity &&
      dashboard.allCity.filter((item) => {
        return item.value === user.cityId;
      });
    setCity(getSeletedCity.length > 0 ? getSeletedCity[0] : []);
    //setCity(1);
  }, [dashboard.allCity]);

  useEffect(() => {
    setStandbyVehicels(dashboard.standBy);
  }, [dashboard.standBy, dispatch]);

  useEffect(() => {
    setOnDutyVehicels(dashboard.onDuty);
  }, [dashboard.onDuty]);

  useEffect(() => {
    setOffDutyVehicels(dashboard.offDuty);
  }, [dashboard.offDuty, dispatch]);

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
    setCloseTripId(vehicle);
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
            seletedCity={city}
            selectionType="checkbox"
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
            setVehicle={setVehicle}
            vehicle={vehicle}
            selectionType="radio"
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
          />
        </div>
      </div>
    </>
  );
}
