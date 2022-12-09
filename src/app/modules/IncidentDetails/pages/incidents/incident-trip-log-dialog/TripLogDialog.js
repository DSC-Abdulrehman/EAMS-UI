import React, { useEffect, useMemo, useState } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
// import { TripLogTable } from "./TripLogTable"
import { IncidentEditDialogHeader } from "./IncidentEditDialogHeader"
import { useIncidentsUIContext } from "../IncidentsUIContext"
import * as actions from "../../../_redux/incidents/incidentActions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function TripLogDialog({ id, show, onHide, userForRead }) {
  const title = "UserEditDialog"
  const [centerId, setCenter] = useState(0)
  const incidentsUIContext = useIncidentsUIContext()
  const incidentsUIProps = useMemo(() => {
    return {
      initIncident: incidentsUIContext.initIncident,
      queryParams: incidentsUIContext.queryParams,
    }
  }, [incidentsUIContext])

  const dispatch = useDispatch()
  const {
    actionsLoading,
    incidentForEdit,
    isuserForRead,
    IncidentType,
    incidentSeverity,
    centers,
    vehicleByCenterId,
    getState,
  } = useSelector(
    (state) => ({
      actionsLoading: state.incidentDetails.actionsLoading,
      incidentForEdit: state.incidentDetails.incidentForEdit,
      isuserForRead: state.incidentDetails.userForRead,
      IncidentType: state.incidentDetails.incidentTypes,
      incidentSeverity: state.incidentDetails.incidentSeverity,
      centers: state.incidentDetails.centers,
      vehicleByCenterId: state.incidentDetails.vehicleByCenterId,
      getState: state,
    }),
    shallowEqual
  )

  // const NewIncidentForEdit = {
  //   ...incidentForEdit.incident,
  //   vehicleId: incidentForEdit.vehicleId,
  //   centerId: incidentForEdit.centerId,
  // }

  // useEffect(() => {
  //   dispatch(actions.fetchIncidentTypes())
  //   dispatch(actions.fetchSeverityTypes())
  //   dispatch(actions.fetchCenters())
  //   dispatch(actions.fetchIncidents(incidentsUIProps.queryParams))
  //   // console.log("centerId", centerId)
  //   dispatch(
  //     actions.fetchVehicleById({
  //       ...incidentsUIProps.queryParams,
  //       centerId: centerId,
  //     })
  //   )

  //   if (!id) {
  //   } else {
  //     dispatch(actions.fetchIncident(id))
  //     if (incidentForEdit) {
  //       dispatch(actions.fetchVehicleById(incidentForEdit.centerId))
  //       // console.log("fetchVehicleById called")
  //     }
  //     // dispatch(actions.fetchVehicleById(incidentForEdit.centerId))
  //     // console.log("incidentForEdit", incidentForEdit)
  //   }
    
  // }, [id, dispatch, incidentsUIProps, centerId])
  
  const saveIncident = (incident) => {
    if (!id) {
      const incidentUpdate = { ...incident }
      dispatch(actions.createIncident(incident)).then((res) => {
        onHide()
      })
    } else {
      //console.log("i'm in update")
      const {
        isActive,
        slug,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt,
        incidentSeverity,
        center,
        incidentType,
        vehicle,
        centerId,
        vehicleId,
        incidentSeverityId,
        ...rest
      } = incident

      //console.log("...rest::", rest)
      // const userUpdatedFields = {
      //   id: saveIncident.id,
      //   email: saveIncident.email,
      //   phNo: saveIncident.phNo,
      //   cnic: saveIncident.cnic,
      //   password: saveIncident.password,
      //   firstName: saveIncident.firstName,
      //   lastName: saveIncident.lastName,
      //   roleId: saveIncident.roleId,
      // }

      dispatch(actions.updateIncident({ ...rest, id }))
      onHide()
    }
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IncidentEditDialogHeader id={id} isUserForRead={userForRead} />
      {/* <TripLogTable
        saveIncident={saveIncident}
        incident={incidentForEdit || incidentsUIProps.initIncident}
        IncidentType={IncidentType}
        incidentSeverity={incidentSeverity}
        centers={centers}
        vehicleByCenterId={vehicleByCenterId}
        onHide={onHide}
        isUserForRead={userForRead}
        setCenter={setCenter}
      /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Modal>
  )
}
