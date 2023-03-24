import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  Input,
  Select,
  TextArea,
} from "../../../../../_metronic/_partials/controls";
// import MaskedInput from "react-text-mask";
// import InputMask from "react-input-mask";
// import { TextField } from "@material-ui/core";
import * as actions from "../../../../../app/modules/IncidentDetails/_redux/incidents/incidentActions";
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

//Validation schema
const incidentEditSchema = Yup.object().shape({
  callerName: Yup.string().required("Caller name is required"),
  callerCNIC: Yup.string().matches(
    cnicRegExp,
    "CNIC should be like 35401-2432321-1"
  ),
  callerPhoneNo: Yup.string()
    .matches(phoneRegExp, "Number should be like 03049018107")
    .required("Phone No is required"),
  patientName: Yup.string(),
  patientCNIC: Yup.string().matches(
    cnicRegExp,
    "CNIC shold be like 35401-2432321-1"
  ),
  location: Yup.string().required("Locations is required"),
  area: Yup.string().required("Area ia required"),
  shortDescription: Yup.string(),
  incidentTypeId: Yup.string(),
  incidentSeverityId: Yup.string(),
  // centerId: Yup.string().required("Center is required"),
  //vehicleId: Yup.string().required("Vehicle is required"),
});

function validateCenterId(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value === 0) {
    error = "Invalid email address";
  }
  return error;
}

export function IncidentEditForm({
  saveIncident,
  incident,
  actionsLoading,
  onHide,
  IncidentType,
  incidentSeverityOption,
  vehicleByCenterId,
  vehiclesForDropdown,
  centers,
  isUserForRead,
  setCenter,
  loading,
  handleClose,
  selectedVehicles,
}) {
  const logTitle = " IncidentEditForm() ";
  const dispatch = useDispatch();
  const [incidentSeverityState, setIncidentSeverityState] = useState();
  const getCenterId = (id) => {
    const queryParams = {
      // filter: {
      //   searchQuery: "",
      // },
      // sortOrder: "name",
      // pageSize: 10,
      // pageNumber: 1,
      centerId: id,
      available: true,
      inProgress: false,
    };

    dispatch(actions.fetchVehicleById({ ...queryParams }));
  };
  const getVehicleIdsForDropdown = (id) => {
    const queryParams = {
      centerId: id,
      available: true,
      inProgress: false,
    };

    dispatch(actions.fetchVehicleByDropdown({ ...queryParams }));
  };

  const queryParamsOnLoad = {
    // filter: {
    //   searchQuery: "",
    // },
    available: true,
    inProgress: false,
    // sortOrder: "name",
    // pageSize: 10,
    // pageNumber: 1,
    centerId: incident?.centerId,
  };
  // console.log("incident", incident);

  // useEffect(() => {
  //   // dispatch(actions.fetchVehicleById({ ...queryParamsOnLoad }));
  //   console.log(queryParamsOnLoad);
  //   dispatch(actions.fetchVehicleByDropdown({ ...queryParamsOnLoad }));
  // }, [incident?.centerId]);
  // This code os
  const NewIncidentForEdit = {
    ...incident,
    vehicleId: incident?.vehicleId,
    centerId: incident?.centerId,
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={incident}
        validationSchema={incidentEditSchema}
        onSubmit={(values) => {
          const { vehicleId } = values;
          const updatedValue = {
            ...values,
            vehicleId: selectedVehicles,
          };

          saveIncident(updatedValue);
        }}
      >
        {({
          errors,
          values,
          handleBlur,
          touched,
          isValidating,
          handleSubmit,
          handleChange,
        }) => {
          return (
            <>
              <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                  <fieldset>
                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Field
                          name="callerName"
                          component={Input}
                          label="Caller Name*"
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
                          label="Caller Phone No*"
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
                          label="Location*"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Field name="area" component={Input} label="Area*" />
                      </div>
                      <div className="col-lg-4">
                        <Select
                          label="Incident Type*"
                          name="incidentTypeId"
                          defaultValue={values?.incidentTypeId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="0" label="Select Type" />
                          {IncidentType &&
                            IncidentType.map((response) => {
                              return (
                                <option
                                  key={response.value}
                                  value={response.value}
                                  label={response.label}
                                />
                              );
                            })}
                        </Select>
                        {errors.incidentTypeId && touched.incidentTypeId && (
                          <div className="invalid-text">
                            {errors.incidentTypeId}
                          </div>
                        )}

                        {/* <Select name="incidentTypeId" label="Incident Type" children={IncidentType}>
                        <option disabled>Please Select</option>
                        {IncidentType ? (
                          IncidentType.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select> */}
                      </div>
                      <div className="col-lg-4">
                        <Select
                          label="Incident Severity*"
                          name="incidentSeverityId"
                          defaultValue={values?.incidentSeverityId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="0" label="Select Type" />
                          {incidentSeverityOption &&
                            incidentSeverityOption.map((response) => {
                              return (
                                <option
                                  key={response.value}
                                  value={response.value}
                                  label={response.label}
                                />
                              );
                            })}
                        </Select>
                        {errors.incidentSeverityId &&
                          touched.incidentSeverityId && (
                            <div className="invalid-text">
                              {errors.incidentSeverityId}
                            </div>
                          )}

                        {/* <Select
                        name="incidentSeverityId"
                        label="Incident Severity"
                      >
                        <option value="1" disabled>
                          Please Select
                        </option>
                        {incidentSeverity ? (
                          incidentSeverity.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select> */}
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
                      <div className="col-12">
                        <label>Selected Vehicles are</label>
                        <ul>
                          {selectedVehicles &&
                            selectedVehicles.map((item, key) => (
                              <li key={key}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </fieldset>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {loading && (
                    <span className="ml-3 mr-3 spinner spinner-white"></span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
                </button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </>
  );
}