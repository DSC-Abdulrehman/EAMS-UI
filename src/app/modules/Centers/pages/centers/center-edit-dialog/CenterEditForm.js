import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { useSelector, useDispatch } from "react-redux";
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable";
import { SearchAbleSelect } from "./SearchAbleSelect";
import { fetchAllCity } from "../../../../../../_metronic/redux/dashboardActions";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];
// Validation schema
const userEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Center Name is required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Invalid format it should be 03049018107")
    .required("Phone No is required"),
  location: Yup.string().required("Location is Required"),
  longitude: Yup.string().required("Lognitude is required"),
  latitude: Yup.string().required("Latitude is required"),
  countryId: Yup.string().required("Country is required"),
  cityId: Yup.string().required("City is required"),
});

export function CenterEditForm({
  saveCenter,
  center,
  actionsLoading,
  onHide,
  roles,
  centers,
  isUserForRead,
  vehiclesForCenter,
  totalCount,
}) {
  const dispatch = useDispatch();
  const [country, setCountry] = useState();
  const countryDropdown = useSelector((item) => item.dashboard.AllCountry);
  const citiesDropdown = useSelector((item) => item.dashboard.AllCity);
  const [loading, setLoading] = useState(false);
  const enableLoading = () => {
    setLoading(true);
  };

  const renderCities = (option) => {
    dispatch(fetchAllCity(option.value));
  };
  console.log("country", country);
  useEffect(() => {
    if (center?.countryId) {
      dispatch(fetchAllCity(center.countryId));
      setCountry(center?.countryId);
    }
  }, [center.countryId]);
  // console.log("citiesDropdown", citiesDropdown);
  // console.log("center", center);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={center}
        validationSchema={userEditSchema}
        onSubmit={(values) => {
          enableLoading();
          saveCenter(values);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleBlur,
          errors,
          touched,
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
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-12 col-md-6">
                      <SearchAbleSelect
                        name="countryId"
                        label="Country"
                        id="countryId"
                        onBlur={() => {
                          handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(option) => {
                          renderCities(option);
                          //setFieldValue("countryId", option.value || null);
                        }}
                        value={center.cityId}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={countryDropdown}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <SearchAbleSelect
                        name="cityId"
                        label="City"
                        onBlur={() => {
                          handleBlur({ target: { name: "cityId" } });
                        }}
                        onChange={(option) =>
                          setFieldValue("cityId", option.value || null)
                        }
                        value={center?.cityId}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={citiesDropdown}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        type="text"
                        name="name"
                        component={Input}
                        placeholder="Center Name"
                        label="Center Name*"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="phoneNo"
                        component={Input}
                        placeholder=""
                        label="Phone No*"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="location"
                        component={Input}
                        placeholder="Location"
                        label="Location*"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="longitude"
                        component={Input}
                        placeholder="Longitude"
                        label="Longitude*"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="latitude"
                        component={Input}
                        placeholder="Latitude"
                        label="Latitude*"
                      />
                    </div>
                  </div>
                </fieldset>
                {isUserForRead ? (
                  <>
                    <CentersVehiclesTable
                      vehiclesForCenter={vehiclesForCenter}
                      totalCount={totalCount}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!isUserForRead ? (
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
              {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                  {loading && (
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
