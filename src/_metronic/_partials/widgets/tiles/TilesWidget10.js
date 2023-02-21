/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { SearchAbleSelect } from "../../../../app/modules/Centers/pages/centers/center-edit-dialog/SearchAbleSelect";
const initialValues = {
  city: "",
  cetner: "",
  subCetner: "",
};

const validationSchema = Yup.object().shape({
  city: Yup.string(),
  center: Yup.string(),
  subCetner: Yup.string(),
});

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

export function TilesWidget10({ className, widgetHeight = "150px" }) {
  //let renderAllCitiy;
  //const user = useSelector((state) => state.auth.tokens);

  const city = useSelector((state) => state.dashboard.entities);
  // useEffect(() => {}, []);
  // console.log("city", city);
  const body = {
    centerId: 53,
    available: true,
    notAvailable: false,
  };

  // fetch(
  //   "https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-drivers-master-data",
  //   {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.access}`,
  //     },
  //     body: JSON.stringify(body),
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const response = data;
  //     renderAllCitiy = response.data;
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  // const colourOptions = cities;
  // console.log("Option parent", cities);
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ height: widgetHeight }}
      >
        {/* begin::Body */}
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
                  <div className="col-4">
                    <SearchAbleSelect
                      name="city"
                      label="city"
                      id="city"
                      onChange={(option) => {
                        console.log("on chnage option", option);
                        // setFieldValue("city", option.value || null);
                      }}
                      // onBlur={() => {
                      //   handleBlur({ target: { name: "city" } });
                      // }}
                      // onChange={(e, selected) =>
                      //   setFieldValue("city", selected.value)
                      // }
                      options={city}
                      error={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-4">
                    <SearchAbleSelect
                      name="cetner"
                      label="Mian Center"
                      // id="city"
                      // onChange={(option) => {
                      //   setFieldValue("city", option.value || null);
                      // }}
                      // onBlur={() => {
                      //   handleBlur({ target: { name: "city" } });
                      // }}
                      // onChange={(e, selected) =>
                      //   setFieldValue("city", selected.value)
                      // }
                      options={colourOptions}
                      // error={errors}
                      // touched={touched}
                    />
                  </div>
                  {/* <div className="col-4">
                    <SearchAbleSelect
                      name="subcenter"
                      label="Sub Center"
                      // id="city"
                      // onChange={(option) => {
                      //   setFieldValue("city", option.value || null);
                      // }}
                      // onBlur={() => {
                      //   handleBlur({ target: { name: "city" } });
                      // }}
                      // onChange={(e, selected) =>
                      //   setFieldValue("city", selected.value)
                      // }
                      options={colourOptions}
                      // error={errors}
                      // touched={touched}
                    />
                  </div> */}
                </div>
              </>
            )}
          </Formik>
          {/* <div className="mr-2">
            <h3 className="font-weight-bolder">Create CRM Reports</h3>
            <div className="text-dark-50 font-size-lg mt-2">
              Generate the latest CRM Report
            </div>
          </div>
          <a href="#" className="btn btn-primary font-weight-bold py-3 px-6">
            Start Now
          </a> */}
        </div>
        {/* end::Body */}
      </div>
    </>
  );
}
