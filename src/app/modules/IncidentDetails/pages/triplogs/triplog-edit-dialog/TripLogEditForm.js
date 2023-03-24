import React, { useEffect, useState } from "react";
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
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
} from "../../../../../../_metronic/redux/dashboardActions";
import { useNavigate } from "react-router-dom";

//Regex for Positive numbers

const PositiveRegex = /^[1-9]+[0-9]*$/;
// Validation schema
const triplogEditSchema = Yup.object().shape({
  cityId: Yup.string(),
  destinationCenterId: Yup.string(),
  destinationSubCenterId: Yup.string(),
  finalReading: Yup.string(),
  logBookNo: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Log Book No. is required"),
  price: Yup.string()
    .nullable()
    .matches(PositiveRegex, "Value should be number")
    .required("Price is required"),
  status: Yup.string(),
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
  onHide,
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

  const [seletCity, setSelectCity] = useState({});
  const [seletCenter, setSelectCenter] = useState({});
  const [seletSubcenter, setSelectsubCenter] = useState({});

  const dispatch = useDispatch();
  const { dashboard, auth } = useSelector((state) => state);
  const { user } = auth;

  useEffect(() => {
    dispatch(fetchAllCity(user.countryId));
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllCityCenters(user.cityId));
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllSubCenter(driverTrip.sourceCenterId));
  }, [user]);

  useEffect(() => {
    setSelectsubCenter(
      dashboard.allSubCenter &&
        dashboard.allSubCenter.filter(
          (item) => item.value === driverTrip.sourceSubCenterId
        )
    );
  }, [dashboard.allSubCenter, driverTrip.sourceSubCenterId]);

  useEffect(() => {
    setSelectCity(
      dashboard.allCity &&
        dashboard.allCity.filter((item) => item.value === user.cityId)
    );
  }, [dashboard.allCity]);

  useEffect(() => {
    setSelectCenter(
      dashboard.cityCenters &&
        dashboard.cityCenters.filter(
          (item) => item.value === driverTrip.sourceCenterId
        )
    );
  }, [dashboard.cityCenters]);

  const {
    sourceCenterId,
    sourceSubCenterId,
    finalReading,
    logBookNo,
    price,
    status,
  } = driverTrip;

  const iniValue = {
    sourceCenterId: sourceCenterId || seletCenter.value,
    sourceSubCenterId: sourceSubCenterId,
    finalReading: finalReading,
    logBookNo: logBookNo || 0,
    price: price || 0,
    status: status,
  };
  // console.log("auth", auth);
  // console.log("driverTrip initial value", iniValue);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={driverTrip}
        //validationSchema={triplogEditSchema}
        onSubmit={(values) => {
          updateTripLog(values);
        }}
      >
        {({ handleSubmit, setFieldValue, handleBlur }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="from form-label-right">
                <fieldset>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="driver.firstName"
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
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="cityId"
                        options={dashboard.allCity}
                        label="Select City"
                        onChange={(e) => {
                          dispatch(fetchAllCityCenters(e.value));
                          setSelectCity(e);
                        }}
                        value={seletCity}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="destinationCenterId"
                        options={dashboard.cityCenters}
                        label="Select Center"
                        onBlur={() => {
                          handleBlur({
                            target: { name: "destinationCenterId" },
                          });
                        }}
                        onChange={(e) => {
                          setFieldValue("destinationCenterId", e.value);
                          dispatch(fetchAllSubCenter(e.value));
                          setSelectCenter(e);
                        }}
                        value={seletCenter}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <SearchSelect
                        name="destinationSubCenterId"
                        options={dashboard.allSubCenter}
                        label="Select Sub-Center"
                        onChange={(e) => {
                          setFieldValue("destinationSubCenterId", e.value);
                          // dispatch(fetchAllSubCenter(e.value));
                          setSelectsubCenter(e);
                        }}
                        value={seletSubcenter}
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
