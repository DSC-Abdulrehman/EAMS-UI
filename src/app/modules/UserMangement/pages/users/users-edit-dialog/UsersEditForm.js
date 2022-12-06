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
import * as actions from "../../../_redux/usersActions"

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
  phNo: Yup.string()
    .min(11, "Minimum 11 symbols")
    .max(11, "Maximum 11 symbols")
    .required("Phone is Required"),
  cnic: Yup.string()
    .min(13, "Minimum 13 symbols")
    .max(13, "Maximum 13 symbols")
    .required("CNIC is Required"),
  password: Yup.string().required("password is required"),
  status: Yup.string(),
  centerId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  roleId: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
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
          //console.log("User form Values", values)
          saveUser(values)
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
                    <div className="col-lg-6">
                      <Select name="centerId" label="Center">
                        {centers.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
                    </div>
                    <div className="col-lg-6">
                      <Select name="roleId" label="Role">
                        {roles.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                      </Select>
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
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="phNo"
                        component={Input}
                        placeholder=""
                        label="Phone No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="cnic"
                        component={Input}
                        placeholder=""
                        label="CNIC"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field name="status" component={Input} label="status" />
                    </div>
                    {!isUserForRead && user.centerId === undefined ? (
                      <div className="col-lg-4">
                        <Field
                          name="password"
                          type="password"
                          component={Input}
                          placeholder=""
                          label="Password"
                        />
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
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
