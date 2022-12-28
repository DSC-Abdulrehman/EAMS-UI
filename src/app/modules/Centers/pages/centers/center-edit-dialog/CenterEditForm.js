import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls"
// import { shallowEqual, useDispatch, useSelector } from "react-redux"
// import * as actions from "../../../_redux/centersActions"
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable"

const phoneRegExp =     /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/

// Validation schema
const userEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Center Name is required"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Invalid format it should be 03049018107').required('Phone No is required'),
  location : Yup.string().required("Location is Required"),
  longitude: Yup.string().required('Lognitude is required'),
  latitude : Yup.string().required('Latitude is required')
  
})

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
  
const [loading, setLoading] = useState(false)
const enableLoading = (() =>{
  setLoading(true)
})
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={center}
        validationSchema={userEditSchema}
        onSubmit={(values) => {
          enableLoading()
          saveCenter(values)
          
        }}
      >
        {({ handleSubmit }) => (
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
                  {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
