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
const userEditSchema = Yup.object().shape({
  Images: Yup.string(),
  SN: Yup.string(),
  countryId: Yup.string().required("Country is required"),
  cityId: Yup.string().required("City is required"),
  hospitalId: Yup.string(),
  statusId: Yup.string().required("status is required"),
  dateTime: Yup.date(),
  fullNameOfTheDeceased: Yup.string(),
  fatherNameOfTheDeceased: Yup.string(),
  Address: Yup.string(),
  callerCnic: Yup.string(),
  callerName: Yup.string(),
  callerPhNo: Yup.string(),
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

export function MortuaryEditForm({
  saveCenter,
  initialValue,
  onHide,
  isUserForRead,
}) {
  const classes = useStyles();
  const dashboard = useSelector((state) => state.dashboard);
  const mortuaryState = useSelector((state) => state.mortuary);
  const user = useSelector((state) => state.users);
  const personalInformation = useSelector((state) => state.personalInformation);

  const { infoForEdit } = personalInformation;

  console.log("infoForEdit", infoForEdit);

  const [createDate, setCreateTime] = useState();
  const [mortuaryReachedTime, setMortuaryReachedTime] = useState();
  const [dischargedTime, setDischargedTime] = useState();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState();
  const [city, setCity] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [status, setStatus] = useState([]);
  const [seletedImages, setSelectedImages] = useState([]);
  const [oldImages, setoldImages] = useState([]);

  useEffect(() => {
    if (infoForEdit.patientName) {
      initialValue.fullNameOfTheDeceased = infoForEdit.patientName;
    }
    if (infoForEdit.dateTime) {
      setCreateTime(new Date(infoForEdit.dateTime));
    }
    if (infoForEdit.callerName) {
      initialValue.callerName = infoForEdit.callerName;
    }
    if (infoForEdit.callerPhNo) {
      initialValue.callerPhNo = infoForEdit.callerPhNo;
    }
    if (infoForEdit.callerCnic) {
      initialValue.callerCnic = infoForEdit.callerCnic;
    }
    if (infoForEdit.description) {
      initialValue.description = infoForEdit.description;
    }
    if (infoForEdit.countryId) {
      initialValue.countryId = infoForEdit.countryId;
    }
    if (infoForEdit.cityId) {
      initialValue.cityId = infoForEdit.cityId;
    }
    if (infoForEdit.statusId) {
      initialValue.statusId = infoForEdit.statusId;
    }
  }, [infoForEdit]);

  useEffect(() => {
    if (infoForEdit.ibFormImages) {
      setSelectedImages(infoForEdit.ibFormImages);
    }
  }, [infoForEdit.ibFormImages]);

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
      value: 1,
      label: "male",
    },
    {
      value: 2,
      label: "Fe-Male",
    },
    {
      value: 3,
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
    infoForEdit.countryId && dispatch(fetchAllCity(infoForEdit.countryId));
  }, [infoForEdit]);

  // useEffect(() => {
  //   if (infoForEdit.districtId) {
  //     dispatch(fetchAllSubCenter(initialValue.districtId));
  //   }
  // }, [infoForEdit]);

  useEffect(() => {
    if (infoForEdit.cityId) {
      dispatch(fetchAllCityCenters(infoForEdit.cityId));
      dispatch(fetchAllHospitals({ cityId: infoForEdit.cityId }));
    }
  }, [infoForEdit.cityId]);

  useEffect(() => {
    if (infoForEdit.countryId) {
      var seletecCOuntry =
        dashboard.allCountry &&
        dashboard.allCountry.find(
          (item) => item.value == infoForEdit.countryId
        );
      setCountry(seletecCOuntry);
    }
  }, [infoForEdit.countryId, dashboard.allCountry]);

  useEffect(() => {
    if (infoForEdit.cityId) {
      var selectedCity =
        dashboard.allCity &&
        dashboard.allCity.find((item) => item.value == infoForEdit.cityId);
      setCity(selectedCity);
    }
  }, [infoForEdit.cityId, dashboard.allCity]);

  useEffect(() => {
    if (infoForEdit.statusId) {
      setStatus(
        user.userStatusTypes.find((item) => item.value === infoForEdit.statusId)
      );
    }
  }, [infoForEdit.statusId]);

  useEffect(() => {
    sethospital(
      mortuaryState.hospitalList.find(
        (item) => item.value == infoForEdit.hospitalId
      )
    );
  }, [infoForEdit.hospitalId, mortuaryState.hospitalList]);

  useEffect(() => {
    if (initialValue.dateTime) {
      setCreateTime(new Date(initialValue.dateTime));
    }
  }, [initialValue.dateTime]);

  useEffect(() => {
    if (initialValue.mortuaryReachdateTime) {
      setMortuaryReachedTime(new Date(initialValue.mortuaryReachdateTime));
    }
  }, [initialValue.mortuaryReachdateTime]);

  useEffect(() => {
    if (initialValue.dischargeFromMortuaryDateTime) {
      setDischargedTime(new Date(initialValue.dischargeFromMortuaryDateTime));
    }
  }, [initialValue.dischargeFromMortuaryDateTime]);

  // console.log("initialValue", initialValue);

  const enableLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={userEditSchema}
        // validateOnChange={false} // Skip validation on field change
        // validateOnBlur={false} // Skip validation on field blur
        onSubmit={(values) => {
          enableLoading();
          const mergedValue = { ...values, oldImages };
          saveCenter(mergedValue);
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
                        label="Serial Number"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="countryId"
                        label="Country"
                        isDisabled={isUserForRead ? true : false}
                        onChange={(e) => {
                          console.log("Onchnage vlue", e.value);
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
                        label="City"
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
                        options={mortuaryState.hospitalList}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <SearchSelect
                        name="statusId"
                        label="Status"
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
                      <label>Incident Date</label>
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
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Mortuary Reached Time</label>
                      <DatePicker
                        className="form-control"
                        selected={mortuaryReachedTime}
                        onChange={(date) => {
                          setFieldValue("mortuaryReachdateTime", date);
                          setMortuaryReachedTime(date);
                        }}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="mortuaryReachdateTime"
                        disabled={isUserForRead}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <label>Discharge mortuary Time</label>
                      <DatePicker
                        className="form-control"
                        selected={dischargedTime}
                        onChange={(date) => {
                          setFieldValue("dischargeFromMortuaryDateTime", date);
                          setDischargedTime(date);
                        }}
                        disabled={isUserForRead}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        name="dischargeFromMortuaryDateTime"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fullNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Deceased Name"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="fatherNameOfTheDeceased"
                        component={Input}
                        placeholder=""
                        label="Father Name"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="Address"
                        component={Input}
                        placeholder=""
                        label="Address"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="callerName"
                        component={Input}
                        placeholder=""
                        label="Caller Name"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="callerPhNo"
                        component={Input}
                        placeholder=""
                        label="Caller Phone"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-5">
                      <Field
                        name="callerCnic"
                        component={Input}
                        placeholder=""
                        label="Caller CNIC"
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

                    {/* {infoForEdit.ibFormImages && (
                      <div className="col-12">
                        <aside style={thumbsContainer}>{thumbs}</aside>
                      </div>
                    )} */}

                    {!isUserForRead && (
                      <div className="col-12">
                        <ImageDropZone
                          name="images"
                          setFieldValue={setFieldValue}
                          disabled={isUserForRead}
                        />
                      </div>
                    )}
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
