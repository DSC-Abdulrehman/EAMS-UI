import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Modal } from "react-bootstrap"
//Validation schema
const RoleEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Role name is required"),
  // lastName: Yup.string()
  //   .min(3, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Lastname is required"),
  // email: Yup.string()
  //   .email("Invalid email")
  //   .required("Email is required"),
  // userName: Yup.string().required("Username is required"),
  // dateOfBbirth: Yup.mixed()
  //   .nullable(false)
  //   .required("Date of Birth is required"),
  // ipAddress: Yup.string().required("IP Address is required"),
})
export function RoleEditForm({ onHide, saveRole, role, actionsLoading }) {

  return (
    <>
      <Formik
      enableReinitialize={true}
        initialValues={role}
        validationSchema={RoleEditSchema}
        onSubmit={(values) => {
          saveRole(values)
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {/* {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )} */}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-12 col-md-6 mx-auto">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Role Name"
                      label="Role Name"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  )
}
