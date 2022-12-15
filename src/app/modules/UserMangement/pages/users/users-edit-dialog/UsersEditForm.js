import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import * as actions from "../../../_redux/usersActions"

// Phone Number Regex
const phoneRegExp =     /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
// CNIC Regex
const cnicRegExp =     /^[0-9]{5}-[0-9]{7}-[0-9]$/

// Validation schema
const userEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phNo: Yup.string().matches(phoneRegExp, 'Invalid format it should be 03049018107').required('Phone No is required'),
  cnic: Yup.string().matches(cnicRegExp, "CNIC should be like 35401-2432321-1").required('CNIC is required'),
  password: Yup.string().required("password is required"),
  status: Yup.string().required("Please select status"),
  centerId: Yup.string()
    .nullable(false)
    .required("Please select center"),
  roleId: Yup.mixed()
    .nullable(false)
    .required("Please select role"),
  // ipAddress: Yup.string().required("IP Address is required"),
})

export function UserEditForm({
  saveUser,
  user,
  actionsLoading,
  onHide,
  roles,
  centers,
  isUserForRead,
}) {
  const [loading, setLoading] = useState(false)
  const enableLoading = (() =>{
    setLoading(true)
  })
  const dispatch = useDispatch()
  const title = "UserEditForm"
  //console.log(title, user)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={userEditSchema}
        onSubmit={(values) => {
          enableLoading()
          //console.log("User form Values", values)
          saveUser(values)
        }}
      >
        {({ handleSubmit, errors }) => (
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
                    <div className="col-lg-6">
                      <Select name="centerId" label="Center">
                        <option value="" disabled selected>
                            Please select center
                        </option>
                        {centers.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                      {/* <p className="inv-feedback">{errors.centerId ? errors.centerId : ''}</p> */}
                    </div>
                    <div className="col-lg-6">
                      <Select name="roleId" label="Role">
                        <option value="" disabled selected>
                            Please select role
                        </option>
                        {roles.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                      {/* <p className="inv-feedback">{errors.roleId ? errors.roleId : ''}</p> */}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="First Name"
                        label="First Name"
                      />
                      {/* <p className="inv-feedback">{errors.firstName ? errors.firstName : ''}</p> */}
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="Last Name"
                        label="Last Name"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        type="email"
                        name="email"
                        component={Input}
                        placeholder="Email"
                        label="Email"
                      />
                      {/* <p className="inv-feedback">{errors.email ? errors.email : ''}</p> */}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="phNo"
                        component={Input}
                        label="Phone No"
                      />
                      {/* <p className="inv-feedback">{errors.phNo ? errors.phNo : ''}</p> */}
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="cnic"
                        component={Input}
                        label="CNIC"
                      />
                      {/* <p className="inv-feedback">{errors.cnic ? errors.cnic : ''}</p> */}
                    </div>
                    <div className="col-lg-4">
                      <Select name="status" label="Status">
                        <option value="" disabled selected>
                            Please select status
                        </option>
                        <option value="available">
                          Available
                        </option>
                        <option value="not available">
                          Not Available
                        </option>
                      </Select>
                      {/* <p className="inv-feedback">{errors.status ? errors.status : ''}</p> */}
                    </div>
                  </div>
                  <div className="form-group row">
                    {!isUserForRead && user.centerId === undefined ? (
                      <div className="col-lg-4">
                        <Field
                          name="password"
                          type="password"
                          component={Input}
                          placeholder=""
                          label="Password"
                        />
                        {/* <p className="inv-feedback">{errors.password ? errors.password : ''}</p> */}
                      </div>
                    ) : (
                      <></>
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
