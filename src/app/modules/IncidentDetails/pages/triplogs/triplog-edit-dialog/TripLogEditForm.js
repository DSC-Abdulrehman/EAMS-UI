import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import MaskedInput from "react-text-mask";

//Regex for Positive numbers

const PositiveRegex = /^[1-9]+[0-9]*$/;
// Validation schema
const triplogEditSchema = Yup.object().shape({
  finalReading: Yup.string().required(" Final reading is required"),
  logBookNo: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Log Book No. is required"),
  price: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Price is required"),
  status: Yup.string().required("Status is required"),
});

// function validateCenterId(value) {
//   let error
//   if (!value) {
//     error = "Required"
//   } else if (value === 0) {
//     error = "Invalid email address"
//   }
//   return error
// }

export function TripLogEditForm({
  updateTripLog,
  driverTrip,
  actionsLoading,
  onHide,
  isUserForRead,
  setCenter,
  loading,
}) {
  const TripStatus = [
    {
      label: "Open",
    },
    {
      label: "InProgress",
    },
    {
      label: "Close",
    },
  ];
  // const DriverTripLog = { ...driverTrip, status }
  // const getStatus = driverTrip

  //check if null value
  // if (driverTrip.logBookNo === null) {
  //   var newdriverTripLog = { ...driverTrip, logBookNo: "" }
  // }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={driverTrip}
        validationSchema={triplogEditSchema}
        onSubmit={(values) => {
          updateTripLog(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="vehicle.driver.firstName"
                        component={Input}
                        label="Driver Name"
                        disabled
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="vehicle.regNo"
                        component={Input}
                        label="Registration Number"
                        disabled
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="initialReading"
                        component={Input}
                        label="Initial Reading"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="finalReading"
                        component={Input}
                        label="Final Reading"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="logBookNo"
                        component={Input}
                        label="Log Book No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field name="price" component={Input} label="Price" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      {/* <Select
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {TripStatus &&
                          TripStatus.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.status && touched.status && (
                        <div className="invalid-text">{errors.status}</div>
                      )} */}

                      <Select name="status" label="Status">
                        {TripStatus ? (
                          TripStatus.map((response) => {
                            return (
                              <option
                                key={response.label}
                                value={response.label}
                              >
                                {response.label}
                              </option>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
                    </div>
                    {/* <div className="col-lg-4">
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
                    </div> */}
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
                    {loading && (
                      <span className="ml-3 mr-3 spinner spinner-white"></span>
                    )}
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
  );
}
