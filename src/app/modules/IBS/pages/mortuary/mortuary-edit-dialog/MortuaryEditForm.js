import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  Input,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { useSelector, useDispatch } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { ImageDropZone } from "../../../../../../_metronic/_helpers/ImageDropZone";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const userEditSchema = Yup.object().shape({
  centerId: Yup.string().required("Main center is required"),
  districtId: Yup.string().required("District is required"),
  incidentTypeId: Yup.string().required("Incidnet Type is required"),
  bodyTypeId: Yup.string().required("Body Type is required"),
  crNo: Yup.string(),
  area: Yup.string(),
  vehicleTypeId: Yup.string(),
  description: Yup.string(),
  hospitalId: Yup.string(),
  name: Yup.string(),
  genderId: Yup.string(),
  callercnic: Yup.string(),
  dateTime: Yup.string(),
  incidentAddress: Yup.string(),
  images: Yup.mixed().required(),
  phoneNo: Yup.string(),
});

export function MortuaryEditForm({
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
  const { id } = useParams();
  const [mainCenter, setMainCenter] = useState([]);
  const mainCenterDropdown = useSelector((item) => item.dashboard?.allCenters);
  const [state, selectedVal] = useState([]);

  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState([]);
  const [incidentType, setIncidentType] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [gender, setGender] = useState([]);

  const enableLoading = () => {
    setLoading(true);
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

  const allTypes = [
    {
      value: 1,
      label: "RTA",
    },
    {
      value: 2,
      label: "Gun Shot",
    },
    {
      value: 3,
      label: "Blast",
    },
    {
      value: 4,
      label: "Sucide",
    },
    {
      value: 5,
      label: "Other Emergency",
    },
  ];

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
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="districtId"
                        label="District"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("districtId", e.value);
                          setDistrict(e);
                        }}
                        value={district}
                        error={errors.districtId}
                        touched={touched.districtId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="incidentTypeId"
                        label="Incident Type*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("incidentTypeId", e.value);
                          setIncidentType(e);
                        }}
                        value={incidentType}
                        error={errors.incidentTypeId}
                        touched={touched.incidentTypeId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="bodyTypeId"
                        label="Body Type*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("bodyTypeId", e.value);
                          setBodyType(e);
                        }}
                        value={bodyType}
                        error={errors.bodyTypeId}
                        touched={touched.bodyTypeId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="crNo"
                        component={Input}
                        placeholder=""
                        label="CR No"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="vehicleTypeId"
                        label="Vehicel Type*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("vehicleTypeId", e.value);
                          setVehicleType(e);
                        }}
                        value={vehicleType}
                        error={errors.vehicleTypeId}
                        touched={touched.vehicleTypeId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="hospitalId"
                        label="Hospital"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("hospitalId", e.value);
                          sethospital(e);
                        }}
                        value={hospital}
                        error={errors.hospitalId}
                        touched={touched.hospitalId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="genderId"
                        label="Gender"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("genderId", e.value);
                          setGender(e);
                        }}
                        value={gender}
                        error={errors.genderId}
                        touched={touched.genderId}
                        options={allTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="phoneNo"
                        component={Input}
                        placeholder=""
                        label="Phone No"
                      />
                    </div>
                    <div className="col-12  mb-5">
                      <Field
                        name="description"
                        component={TextArea}
                        placeholder=""
                        label="Description"
                      />
                    </div>
                    <div className="col-12">
                      <ImageDropZone setFieldValue={setFieldValue} />
                    </div>
                  </div>
                </fieldset>
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
