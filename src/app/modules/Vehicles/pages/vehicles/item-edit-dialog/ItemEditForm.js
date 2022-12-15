import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
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
    .required(),
  regNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  // center: Yup.string(),
  // category: Yup.string(),
  engineCapacity: Yup.string().required(),
  registerCity: Yup.string().required(),
  chasis: Yup.string().required(),
  milleage: Yup.string().required(),
  year: Yup.string().required(),
  make: Yup.string().required(),
  model: Yup.string().required(),
  color: Yup.string().required(),
  fuelType: Yup.string().required(),
  transmission: Yup.string().required(),
  status: Yup.string().required(requiredErrorMessage),
  centerId: Yup.string().required(),
  vehicleCategoryId: Yup.string().required(),
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
  //console.log("itemfor edit", item)

  const classes = useStyles();
  const [Loading, setLoading] = useState(false);

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
        {({ handleSubmit, touched, errors }) => (
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
                      <Select name="fuelType" label="Fuel Type">
                        <option value="petrol">Petrol</option>
                        <option value="gas">Gas</option>
                      </Select>
                      {/* <Field
                        name="fuelType"
                        component={Input}
                        placeholder=""
                        label="Fuel Type"
                      /> */}
                    </div>
                    <div className="col-lg-4">
                      {/* <Field
                        name="status"
                        component={Select}
                        placeholder=""
                        label="status No"
                        children={}
                      /> */}
                      <Select name="status" label="Status">
                        <option>Please Select Option</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </Select>
                      {touched.status && errors.status ? errors.status : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select name="transmission" label="Transmission">
                        <option value="auto">Auto</option>
                        <option value="manual">manual</option>
                      </Select>
                      {/* <Field
                        name="transmission"
                        component={Input}
                        placeholder=""
                        label="Transmission"
                      /> */}
                    </div>
                    <div className="col-lg-4">
                      <Select name="centerId" label="Center">
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
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="vehicleCategoryId" label="Vehicle Category">
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
                      </Select>
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
