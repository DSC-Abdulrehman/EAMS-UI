import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { useSelector, useDispatch } from "react-redux";
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable";
import { SearchAbleSelect } from "./SearchAbleSelect";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const userEditSchema = Yup.object().shape({
  centerId: Yup.string().required("Main center is required"),
  name: Yup.string()
    .min(3, "Minimum 3 letters")
    .max(50, "Maximum 50 letters")
    .required("Sub Center Name is required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Invalid format it should be 03049018107")
    .required("Phone No is required"),
  // location: Yup.string().required("Location is Required"),
  // longitude: Yup.string().required("Lognitude is required"),
  // latitude: Yup.string().required("Latitude is required"),
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
  // const [country, setCountry] = useState();
  // const [city, setCity] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [mainCenter, setMainCenter] = useState([]);
  const mainCenterDropdown = useSelector((item) => item.dashboard?.allCenters);
  const [state, selectedVal] = useState([]);
  const [loading, setLoading] = useState(false);
  const enableLoading = () => {
    setLoading(true);
  };

  // if (id) {
  //   console.log("Id UseEffctr call", id);
  //   selectedVal(
  //     mainCenterDropdown &&
  //       mainCenterDropdown.find((item) => item.value === center.centerId)
  //   );
  // }
  // useEffect(() => {
  //   const getDefaultValue = mainCenterDropdown.filter((item) => {
  //     console.log("item", item);
  //   });
  //   console.log("UseEffect call", getDefaultValue);
  //   // selectedVal(mainCenterDropdown.find((item) => item.value === center.centerId)
  // }, [id]);
  const onChangeSelectedOption = (e) => {
    console.log("e", e);
    selectedVal({ selectedVal: e.value });
    //this.setState({ selectedVal: e.value });
  };

  const { dashboard } = useSelector((state) => state);

  useEffect(() => {
    setMainCenter(
      dashboard.allCenters &&
        dashboard.allCenters.find((item) => {
          return item.value === center?.centerId;
        })
    );
  }, [center, dashboard.allCenters]);
  //console.log("state", state);
  // console.log("mainCenterDropdown", mainCenterDropdown);

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
          field,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="form-group row">
                    <div className="col-12 col-md-4 mb-5">
                      <SearchSelect
                        name="centerId"
                        options={dashboard.allCenters}
                        label="Main Center"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("centerId", e.value);
                          setMainCenter(e);
                        }}
                        value={mainCenter}
                      />
                      {/* <SearchAbleSelect
                        name="centerId"
                        label="Main Center*"
                        onBlur={() => {
                          handleBlur({ target: { name: "centerId" } });
                        }}
                        //onChange={onChangeSelectedOption}
                        onChange={(option) => {
                          //console.log("ON CHANGE option,", option);
                          setFieldValue("centerId", option);
                          //setFieldValue(field.name, option.value);
                        }}
                        value={center.centerId}
                        error={errors.centerId}
                        touched={touched.centerId}
                        options={mainCenterDropdown}
                        // defalutValue={state}
                      /> */}
                    </div>

                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="name"
                        component={Input}
                        placeholder="sub Center Name"
                        label="Sub Center Name*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="phoneNo"
                        component={Input}
                        placeholder=""
                        label="Phone No*"
                      />
                    </div>
                    {/* <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="location"
                        component={Input}
                        placeholder="Location"
                        label="Location*"
                      />
                    </div> */}

                    {/* <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="longitude"
                        component={Input}
                        placeholder="Longitude"
                        label="Longitude*"
                      />
                    </div>
                    <div className="col-12 col-md-4 mb-5">
                      <Field
                        name="latitude"
                        component={Input}
                        placeholder="Latitude"
                        label="Latitude*"
                      />
                    </div> */}
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
