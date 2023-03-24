/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { SearchSelect } from "../../../_helpers/SearchSelect";
import * as action from "../../../redux/dashboardActions";

const initialValues = {
  cityId: "",
  cetnerId: "",
  subCetnerId: "",
};

const validationSchema = Yup.object().shape({
  cityId: Yup.string(),
  centerId: Yup.string(),
  subCetnerId: Yup.string(),
});

export function TilesWidget10({
  className,
  widgetHeight = "150px",
  setCity,
  seletCity,
  setCenter,
  center,
  setSubcenter,
}) {
  const dispatch = useDispatch();

  //const city = useSelector((state) => state.dashboard.entities);

  const { countryId, cityId } = useSelector((state) => state.auth.user);
  const dashboard = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(action.fetchAllCity(countryId));
  }, [countryId]);

  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ height: widgetHeight }}
      >
        <div className="card-body align-items-center">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={(values) => {
            //   console.log("Center Form values", values);
            //   //saveCenter(values);
            // }}
          >
            {(handleBlur, setFieldValue, errors, touched) => (
              <>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <SearchSelect
                      name="cityId"
                      options={dashboard.allCity}
                      label="Select City"
                      onChange={(e) => {
                        dispatch(action.fetchAllCityCenters(e.value));
                        dispatch(
                          action.fetchDashboardVehicles({ cityId: e.value })
                        );
                        setCity(e);
                      }}
                      value={seletCity}
                    />
                  </div>
                  <div className="col-4">
                    <SearchSelect
                      name="centerId"
                      options={dashboard.cityCenters}
                      label="Select Mian Center"
                      onChange={(e) => {
                        dispatch(action.fetchAllSubCenter(e.value));
                        dispatch(
                          action.fetchDashboardVehicles({
                            cityId: cityId,
                            centerId: e.value,
                          })
                        );
                        setCenter(e);
                      }}
                      // value={defCenter}
                    />
                  </div>
                  <div className="col-4">
                    <SearchSelect
                      name="subCenterId"
                      options={dashboard.allSubCenter}
                      label="Select Subcenter"
                      onChange={(e) => {
                        dispatch(
                          action.fetchDashboardVehicles({
                            cityId: cityId,
                            centerId: center.value,
                            subCenterId: e.value,
                          })
                        );
                        setSubcenter(e);
                      }}
                      // value={defSubcenter}
                    />
                  </div>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
