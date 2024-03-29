import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { ImageDropZone } from "../../../../../../_metronic/_helpers/ImageDropZone";
import {
  fetchAllCity,
  fetchAllCityCenters,
  fetchAllSubCenter,
  fetchDashboardVehicles,
} from "../../../../Dashboard/_redux/dashboardActions";
import {
  fetchAllHospitals,
  fetchAllPoliceStations,
} from "../../../_redux/mortuary/reduxActions";

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// Validation schema
const formSchema = Yup.object().shape({
  SN: Yup.number(),
  countryId: Yup.number().required("Country is required"),
  cityId: Yup.number().required("City is required"),
  statusId: Yup.number().required("status is required"),
  dateTime: Yup.date().required("incident date is required"),
  dateTimeofDeath: Yup.date(),
  fullNameOfTheDeceased: Yup.string().required("Name of deceased required"),
  fatherNameOfTheDeceased: Yup.string().required(
    "Father Name of deceased is required"
  ),
  gender: Yup.string(),
  nativePlace: Yup.string(),
  religion: Yup.string(),
  cast: Yup.string(),
  surname: Yup.string(),
  age: Yup.number()
    .positive("Number must be positive")
    .min(1, "Number must be greater then 0")
    .max(150, "Number must be less than or equal to 150")
    .required("Age is required"),
  placeOfDeath: Yup.string(),
  reporterCnic: Yup.string(),
  causeOfDeath: Yup.string(),
  reporterCnic: Yup.string(),
  reporterName: Yup.string(),
  reporterPhNo: Yup.string(),
  description: Yup.string(),
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    position: "absolute",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    position: "absolute",
    color: "red",
    fontSize: 22,
    right: 0,
  },
}));

export function CoffinEditForm({
  saveCenter,
  initialValue,
  onHide,
  isUserForRead,
}) {
  const classes = useStyles();
  const dashboard = useSelector((state) => state.dashboard);
  const mortuaryState = useSelector((state) => state.mortuary);
  const user = useSelector((state) => state.users);

  const [createDate, setCreateTime] = useState(null);
  const [deathTime, setDateTimeOfDeath] = useState(null);
  const [dischargedTime, setDischargedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [gender, setGender] = useState([]);
  const [status, setStatus] = useState([]);
  const [seletedImages, setSelectedImages] = useState([]);
  const [oldImages, setoldImages] = useState([]);

  useEffect(() => {
    if (initialValue.mortuaryFormImages) {
      setSelectedImages(initialValue.mortuaryFormImages);
    }
  }, [initialValue.mortuaryFormImages]);

  //console.log("initialValue", initialValue);
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const removeImage = (index, id) => {
    const updatedImages = [...seletedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setoldImages((preIds) => [...preIds, id]);
  };

  const thumbs =
    seletedImages &&
    seletedImages.map((file, index) => {
      return (
        <>
          <Box component="span" m={1} key={file.name}>
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img src={file.url} style={img} />
                {/* <Fab
            size="small"
            color="secondary"
            aria-label="add"
            className={classes.margin}
          > */}
                {!isUserForRead && (
                  <ClearIcon
                    className={classes.extendedIcon}
                    onClick={() => removeImage(index, file.id)}
                  />
                )}

                {/* </Fab> */}
              </div>
            </div>
          </Box>
        </>
      );
    });

  const genderList = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  const vehicleTypeoptions = [
    {
      value: 1,
      label: "Edhi Vehicle",
    },
    {
      value: 2,
      label: "private",
    },
  ];

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
    {
      value: 6,
      label: "injured",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    initialValue.countryId && dispatch(fetchAllCity(initialValue.countryId));
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.districtId) {
      dispatch(fetchAllSubCenter(initialValue.districtId));
    }
  }, [initialValue]);

  useEffect(() => {
    if (initialValue.cityId) {
      dispatch(fetchAllCityCenters(initialValue.cityId));
      dispatch(fetchAllHospitals({ cityId: initialValue.cityId }));
    }
  }, [initialValue.cityId]);

  useEffect(() => {
    if (initialValue.countryId) {
      var seletecCOuntry =
        dashboard.allCountry &&
        dashboard.allCountry.find(
          (item) => item.value == initialValue.countryId
        );
      setCountry(seletecCOuntry);
    }
  }, [initialValue.countryId]);

  useEffect(() => {
    if (initialValue.cityId) {
      var selectedCity =
        dashboard.allCity &&
        dashboard.allCity.find((item) => item.value == initialValue.cityId);
      setCity(selectedCity);
    }
  }, [initialValue.cityId, dashboard.allCity]);

  useEffect(() => {
    if (initialValue.statusId) {
      setStatus(
        user?.userStatusTypes?.find(
          (item) => item.value === initialValue.statusId
        )
      );
    }
  }, [initialValue.statusId]);

  useEffect(() => {
    if (initialValue.gender) {
      setGender(genderList.find((item) => item.value == initialValue.gender));
    }
  }, [initialValue.gender]);

  useEffect(() => {
    if (initialValue.dateTime) {
      setCreateTime(new Date(initialValue.dateTime));
    }
  }, [initialValue.dateTime]);

  const enableLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={formSchema}
        // validateOnChange={false} // Skip validation on field change
        // validateOnBlur={false} // Skip validation on field blur
        onSubmit={(values) => {
          enableLoading();
          // const mergedValue = { ...values, oldImages };
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
                      <Field
                        name="SN"
                        component={Input}
                        type="Number"
                        label="Serial Number"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="countryId"
                        label="Country*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          dispatch(fetchAllCity(e.value));
                          setFieldValue("countryId", e.value);
                          setCountry(e);
                        }}
                        value={country}
                        error={errors.countryId}
                        touched={touched.countryId}
                        options={dashboard.allCountry}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="cityId"
                        label="City*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          dispatch(fetchAllCityCenters(e.value));
                          dispatch(fetchAllHospitals({ cityId: e.value }));
                          dispatch(fetchAllPoliceStations({ cityId: e.value }));
                          setFieldValue("cityId", e.value);
                          setCity(e);
                        }}
                        value={city}
                        error={errors.cityId}
                        touched={touched.cityId}
                        options={dashboard.allCity}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Incident Date*</label>
                      <DatePicker
                        className="form-control"
                        selected={createDate}
                        onChange={(date) => {
                          console.log("Date", date);
                          setFieldValue("dateTime", date);
                          setCreateTime(date);
                        }}
                        disabled={isUserForRead}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="dateTime"
                      />
                      {errors.dateTime && touched.dateTime ? (
                        <div className="form-feedBack">{errors.dateTime}</div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fullNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Deceased Name*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fatherNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Father Name*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="surname"
                        component={Input}
                        placeholder=""
                        label="Surname"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="cast"
                        component={Input}
                        placeholder=""
                        label="Cast"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="religion"
                        component={Input}
                        placeholder=""
                        label="Religion"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="nativePlace"
                        component={Input}
                        placeholder=""
                        label="Native Place"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="age"
                        component={Input}
                        placeholder=""
                        type="Number"
                        label="Age*"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="gender"
                        label="Gender"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("gender", e.value);
                          setGender(e);
                        }}
                        value={gender}
                        error={errors.gender}
                        touched={touched.gender}
                        options={genderList}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="statusId"
                        label="Status*"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          setFieldValue("statusId", e.value);
                          setStatus(e);
                        }}
                        value={status}
                        error={errors.statusId}
                        touched={touched.statusId}
                        options={user.userStatusTypes}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Time of Death</label>
                      <DatePicker
                        className="form-control"
                        selected={deathTime}
                        onChange={(date) => {
                          setFieldValue("dateTimeofDeath", date);
                          setDateTimeOfDeath(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="dateTimeofDeath"
                        disabled={isUserForRead}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="causeOfDeath"
                        component={Input}
                        placeholder=""
                        label="Cause Of Death"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="placeOfDeath"
                        component={Input}
                        label="Place of Death"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterName"
                        component={Input}
                        placeholder=""
                        label="Reporter Name"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterPhNo"
                        component={Input}
                        placeholder=""
                        label="Reporter Phone"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="reporterCnic"
                        component={Input}
                        placeholder=""
                        label="Reporter CNIC"
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
