import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CenterEditForm } from "./CenterEditForm";
import { CenterEditDialogHeader } from "./CenterEditDialogHeader";
import { useCentersUIContext } from "../CentersUIContext";
import * as actions from "../../../_redux/subcenters/subCentersActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllCity } from "../../../../../../_metronic/redux/dashboardActions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function CenterEditDialog({ id, show, isNew, onHide, userForRead }) {
  const classes = useStyles();
  const [isForEdit, setIsForEdit] = useState();
  const centersUIContext = useCentersUIContext();
  const centersUIProps = useMemo(() => {
    return {
      initCenter: centersUIContext.initCenter,
      queryParams: centersUIContext.queryParams,
      secondQueryParams: centersUIContext.secondQueryParams,
    };
  }, [centersUIContext]);

  const dispatch = useDispatch();

  const { lastTrips } = useSelector(
    (state) => ({
      lastTrips: state.dashboard?.lastTrips,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //   if (id) {
  //     // dispatch(actions.fetchCenter(id));
  //     dispatch(
  //       actions.fetchVehicles({
  //         ...centersUIProps.secondQueryParams,
  //         subCenterId: id,
  //         // centerId: centerForEdit.centerId,
  //       })
  //     );
  //   }
  // }, [id, centersUIProps.secondQueryParams]);

  // useEffect(() => {
  //   if (id) {
  //     if (centerForEdit || userForRead) {
  //       // console.log("centerForEdit", centerForEdit);
  //       dispatch(actions.fetchAllCity(centerForEdit.countryId));
  //     }
  //   }
  // }, [id]);

  //console.log("centerForEdit", centerForEdit);
  const saveCenter = (center) => {
    console.log("cneter", center);
    //console.log("Update sub center", center);
    const { centerId, ...rest } = center;
    // const finalObj = {
    //   centerId: centerId.value,
    //   ...rest,
    // };
    // console.log("finalObj", finalObj);
    if (!id) {
      dispatch(actions.createCenter(center)).then((res) => {
        onHide();
      });
    } else {
      const centerUpdatedFields = {
        id: center.id,
        name: center.name,
        phoneNo: center.phoneNo,
        // location: center.location,
        // longitude: center.longitude,
        // latitude: center.latitude,
        centerId: center.centerId,
        // conuntryId: center.conuntryId,
        // cityId: center.cityId,
      };
      dispatch(actions.updateCenter(centerUpdatedFields));
      onHide();
    }
  };

  const { totalResults, rows } = lastTrips;

  // console.log("Center Modal open", lastTrips);

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CenterEditDialogHeader id={id} />
      <Modal.Body className="overlay overlay-block cursor-default">
        <CentersVehiclesTable
          vehiclesForCenter={rows}
          totalCount={totalResults}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-primary btn-elevate"
        >
          Ok
        </button>
      </Modal.Footer>

      {/* <CentersVehiclesTable
        
      /> */}
    </Modal>
  );
}
