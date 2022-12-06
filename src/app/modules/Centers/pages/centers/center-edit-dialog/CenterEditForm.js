import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import * as actions from "../../../_redux/centersActions"
import { CentersVehiclesTable } from "../centers-vehicles-table/CentersVehiclesTable"

// Validation schema
const userEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Center Name is required"),
  // lastName: Yup.string()
  //   .min(3, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Lastname is required"),
  // email: Yup.string()
  //   .email("Invalid email")
  //   .required("Email is required"),
  phoneNo: Yup.string()
    .min(11, "Minimum 11 symbols")
    .max(11, "Maximum 11 symbols")
    .required("Phone is Required"),
  // cnic: Yup.string()
  //   .min(13, "Minimum 13 symbols")
  //   .max(13, "Maximum 13 symbols")
  //   .required("CNIC is Required"),
  // password: Yup.string().required("password is required"),
  // centerId: Yup.mixed()
  //   .nullable(false)
  //   .required("Date of Birth is required"),
  // roleId: Yup.mixed()
  //   .nullable(false)
  //   .required("Date of Birth is required"),
  // ipAddress: Yup.string().required("IP Address is required"),
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
  const dispatch = useDispatch()
  const title = "UserEditForm"

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={center}
        validationSchema={userEditSchema}
        onSubmit={(values) => {
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
                    <div className="col-lg-6">
                      <Field
                        type="text"
                        name="name"
                        component={Input}
                        placeholder="Center Name"
                        label="Center Name"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="phoneNo"
                        component={Input}
                        placeholder=""
                        label="Phone No"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="location"
                        component={Input}
                        placeholder="Location"
                        label="Location"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="longitude"
                        component={Input}
                        placeholder="Longitude"
                        label="Longitude"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="latitude"
                        component={Input}
                        placeholder="Latitude"
                        label="Latitude"
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
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
