import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
  TextArea,
} from "../../../../../../_metronic/_partials/controls"
import { max } from "date-fns"
import * as actions from "../../../_redux/incidents/incidentActions"


// Validation schema
const incidentEditSchema = Yup.object().shape({
  callerName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),
  callerCNIC: Yup.number(),
  callerPhoneNo: Yup.number().required("Phone is required"),
  patientName: Yup.string()
    .max(50)
    .required("Patient Name is Required"),
  patientCNIC: Yup.number(),
  location: Yup.string().required("Location is required"),
  area: Yup.string().required("Area is required"),
  shortDescription: Yup.string().required("Description is required"),
  incidentTypeId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  incidentSeverityId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  centerId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  vehicleId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
})

function validateCenterId(value) {
  let error
  if (!value) {
    error = "Required"
  } else if (value === 0) {
    error = "Invalid email address"
  }
  return error
}

export function IncidentEditForm({
  saveIncident,
  incident,
  actionsLoading,
  onHide,
  IncidentType,
  incidentSeverity,
  vehicleByCenterId,
  centers,
  isUserForRead,
  setCenter,
}) {
  const dispatch = useDispatch()
  const getCenterId = ((id) =>{
  
    const queryParams ={
      filter: {
        "searchQuery": ""
    },
      sortOrder: "name",
      pageSize: 10,
      pageNumber: 1,
      centerId: id
    }

    dispatch(actions.fetchVehicleById({...queryParams}))
    
  })

  const NewIncidentForEdit = {
    ...incident.incident,
    vehicleId: incident.vehicleId,
    centerId: incident.centerId,
  }

  const selectedVehicle = incident.vehicleId
  // setCenter(incident.centerId)
  // console.log("NewIncidentForEdit", NewIncidentForEdit)
  // console.log("vehicleByCenterId", vehicleByCenterId)
  // const {centerId, incident,vehicleId} = incident
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={NewIncidentForEdit}
        validationSchema={incidentEditSchema}
        onSubmit={(values) => {
          saveIncident(values)
        }}
      >
        {({ errors, touched, isValidating, handleSubmit, handleChange }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="callerName"
                        component={Input}
                        label="Caller Name"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="callerCNIC"
                        component={Input}
                        label="Caller CNIC"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="callerPhoneNo"
                        component={Input}
                        label="Caller Phone No"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="patientName"
                        component={Input}
                        label="Patient Name"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="patientCNIC"
                        component={Input}
                        label="Patient CNIC"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="location"
                        component={Input}
                        label="Location"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field name="area" component={Input} label="Area" />
                    </div>
                    <div className="col-lg-4">
                      <Select name="incidentTypeId" label="Incident Type">
                        {IncidentType ? (
                          IncidentType.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select
                        name="incidentSeverityId"
                        label="Incident Severity"
                      >
                        {incidentSeverity ? (
                          incidentSeverity.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="shortDescription"
                        component={TextArea}
                        label="Short Description"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Select
                        name="centerId"
                        label="Center"
                        onChange={(e) => {
                          setCenter(e.currentTarget.value)
                          handleChange(e)
                          getCenterId(e.currentTarget.value)
                        }}
                      >
                        <option>Select Nearest Center</option>
                        {centers ? (
                          centers.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Select name="vehicleId" label="vehicle" multiple>
                        {isUserForRead ? (
                          selectedVehicle ? (
                            selectedVehicle.map((res) => {
                              //console.log("selectedVehicle", res)
                              return (
                                <option key={res.id} value={res.id}>
                                  {res.regNo}
                                </option>
                              )
                            })
                          ) : (
                            <></>
                          )
                        ) : vehicleByCenterId ? (
                          vehicleByCenterId.map((res) => {
                            // console.log("vehicleByCenterId", res)
                            return (
                              <option key={res.id} value={res.id}>
                                {res.regNo}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )}
                        {/* {vehicleByCenterId ? (
                          vehicleByCenterId.map((response) => {
                            console.log("vehicleId response", response)
                            return (
                              <option key={response.id} value={response.id}>
                                {response.regNo}
                              </option>
                            )
                          })
                        ) : (
                          <></>
                        )} */}
                      </Select>
                    </div>
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {/* <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button> */}
              {!isUserForRead ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-primary btn-elevate"
                >
                  Ok
                </button>
              )}

              <> </>
              {/* {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                </button>
              )} */}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
