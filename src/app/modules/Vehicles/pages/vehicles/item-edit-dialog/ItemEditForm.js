import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { fetchDrivers } from "../../../_redux/vehiclesActions";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  CustumSelect,
} from "../../../../../../_metronic/_partials/controls";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
}));

// Validation schema
const requiredErrorMessage = "This field is required";
const itemEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  regNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Registration No is required"),
  // center: Yup.string(),
  // category: Yup.string(),
  engineCapacity: Yup.string().required("Engine capacity is required"),
  registerCity: Yup.string().required("Register city is required"),
  chasis: Yup.string().required("Chasis is required"),
  milleage: Yup.string().required("Milleage is required"),
  year: Yup.string()
    .required("Register year is required")
    .matches(/^\d*[1-9]\d*$/, "Year should be number"),
  make: Yup.string().required("Maker name is required"),
  model: Yup.string().required("Model No is required"),
  color: Yup.string().required("Color is required"),
  fuelType: Yup.string().required("Fuel type is required"),
  status: Yup.string().required("Status is required"),
  transmission: Yup.string(),
  centerId: Yup.string().required("Cneter Id is required"),
  driverId: Yup.string().required("Driver Id is required"),
  vehicleCategoryId: Yup.string().required("Vehicle category is required"),
  engineNo: Yup.string().required(" Engine No is required"),
});

export function ItemEditForm({
  saveItem,
  item,
  centerName,
  actionsLoading,
  onHide,
  itemForRead,
  category,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [cetnerId, setCenterId] = useState(0);

  useEffect(() => {
    dispatch(fetchDrivers(cetnerId));
  }, [cetnerId]);

  useEffect(() => {
    dispatch(fetchDrivers(item.centerId));
  }, [item.centerId]);
  const drivers = useSelector((state) => {
    return state?.vehicles?.drivers;
  });

  console.log("itemfor edit", item);

  const fuelTypeOptions = [
    {
      value: "Pertol",
      name: "Pertol",
    },
    {
      value: "Gas",
      name: "Gas",
    },
  ];
  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {actionsLoading && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}

      <Formik
        enableReinitialize={true}
        initialValues={item}
        validationSchema={itemEditSchema}
        onSubmit={(values) => {
          enableLoading();
          saveItem(values);
          // disableLoading();
        }}
      >
        {({
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          values,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={itemForRead}>
                  <div className="form-group row">
                    {/* <div className="col-lg-6">
                      <Select name="centerId" label="Center">
                        {centers.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                    </div> */}
                    {/* <div className="col-lg-6">
                      <Select name="roleId" label="Role">
                        {roles.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                    </div> */}
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        type="text"
                        name="name"
                        component={Input}
                        placeholder=""
                        label="vehicle Name"
                        customFeedbackLabel="hello"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="regNo"
                        component={Input}
                        placeholder=""
                        label="Registration No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="engineCapacity"
                        component={Input}
                        placeholder=""
                        label="Engine Capacity"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="registerCity"
                        component={Input}
                        placeholder=""
                        label="Register City"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="chasis"
                        component={Input}
                        placeholder=""
                        label="Chasis"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="milleage"
                        component={Input}
                        placeholder=""
                        label="Milleage"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="year"
                        component={Input}
                        placeholder=""
                        label="Year"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="make"
                        component={Input}
                        placeholder=""
                        label="Make"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="model"
                        component={Input}
                        placeholder=""
                        label="Model"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="color"
                        component={Input}
                        placeholder=""
                        label="Color"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="engineNo"
                        component={Input}
                        placeholder=""
                        label="Engine No."
                      />
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Fuel Type"
                        name="fuelType"
                        value={values.fuelType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        <option value="Pertol" label="Petrol" />
                        <option value="Gas" label="Gas" />
                      </Select>
                      {errors.fuelType && touched.fuelType && (
                        <div className="invalid-text">{errors.fuelType}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        <option value="Available" label="Available" />
                        <option value="Unavailable" label="Unavailable" />
                      </Select>
                      {errors.status && touched.status && (
                        <div className="invalid-text">{errors.status}</div>
                      )}
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Transmission"
                        name="transmission"
                        value={values.transmission}
                      >
                        <option value="" label="Select Type" />
                        <option value="auto" label="Auto" />
                        <option value="manual" label="Manual" />
                      </Select>
                      {errors.transmission && touched.transmission && (
                        <div className="invalid-text">
                          {errors.transmission}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Vehicle Category"
                        name="vehicleCategoryId"
                        value={values.vehicleCategoryId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {category &&
                          category.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.vehicleCategoryId &&
                        touched.vehicleCategoryId && (
                          <div className="invalid-text">
                            {errors.vehicleCategoryId}
                          </div>
                        )}
                      {/* <Select name="vehicleCategoryId" label="Vehicle Category">
                        {category &&
                          category.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })}
                      </Select> */}
                    </div>
                  </div>
                  <div className="from-group row">
                    <div className="col-lg-4">
                      <Select
                        label="Center"
                        name="centerId"
                        value={values.centerId}
                        onChange={(e) => {
                          handleChange(e);
                          setCenterId(e.target.value);
                        }}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {centerName &&
                          centerName.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.centerId && touched.centerId && (
                        <div className="invalid-text">{errors.centerId}</div>
                      )}
                      {/* <Select name="centerId" label="Center">
                        {centerName &&
                          centerName.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            );
                          })}
                      </Select> */}
                    </div>
                    <div className="col-lg-4">
                      <Select
                        label="Driver"
                        name="driverId"
                        defalutvalue={values.driverId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select Type" />
                        {drivers &&
                          drivers.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                                label={response.label}
                              />
                            );
                          })}
                      </Select>
                      {errors.driverId && touched.driverId && (
                        <div className="invalid-text">{errors.driverId}</div>
                      )}
                    </div>
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!itemForRead ? (
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
                </button>
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
              {!itemForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {Loading && (
                    <span className="ml-3 mr-3 spinner spinner-white"></span>
                  )}
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
