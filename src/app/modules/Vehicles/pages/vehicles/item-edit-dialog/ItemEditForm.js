import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls"

// Validation schema
const itemEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  regNo: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
    center: Yup.string(),
    category: Yup.string(),
  engineCapacity: Yup.string(),
  registerCity: Yup.string(),
  chasis: Yup.string(),
  milleage: Yup.string(),
  year: Yup.string(),
  make: Yup.string(),
  model: Yup.string(),
  color: Yup.string(),
  fuelType: Yup.string(),
  transmission: Yup.string(),
  status: Yup.string(),
  centerId: Yup.number()
    .required()
    .positive()
    .integer(),
  vehicleCategoryId: Yup.string(),
})

export function ItemEditForm({
  saveItem,
  item,
  centerName,
  actionsLoading,
  onHide,
  itemForRead,
  category,
}) {

  //console.log("itemfor edit", item)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={item}
        validationSchema={itemEditSchema}
        onSubmit={(values) => {
          // console.log("saveItem", values)
          saveItem(values)
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
                <fieldset disabled={itemForRead}>
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
                    <div className="col-lg-4">
                      <Field
                        type="text"
                        name="name"
                        component={Input}
                        placeholder=""
                        label="vehicle Name"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="regNo"
                        component={Input}
                        placeholder=""
                        label="Registration No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="engineCapacity"
                        component={Input}
                        placeholder=""
                        label="Engine Capacity"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="registerCity"
                        component={Input}
                        placeholder=""
                        label="Register City"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="chasis"
                        component={Input}
                        placeholder=""
                        label="Chasis"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="milleage"
                        component={Input}
                        placeholder=""
                        label="Milleage"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="year"
                        component={Input}
                        placeholder=""
                        label="Year"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="make"
                        component={Input}
                        placeholder=""
                        label="Make"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="model"
                        component={Input}
                        placeholder=""
                        label="Model"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="color"
                        component={Input}
                        placeholder=""
                        label="Color"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="fuelType"
                        component={Input}
                        placeholder=""
                        label="Fuel Type"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="status"
                        component={Input}
                        placeholder=""
                        label="Status"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="transmission"
                        component={Input}
                        placeholder=""
                        label="Transmission"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Select name="centerId" label="Center">
                        {centerName &&
                          centerName.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="vehicleCategoryId" label="Vehicle Category">
                        {category &&
                          category.map((response) => {
                            return (
                              <option
                                key={response.value}
                                value={response.value}
                              >
                                {response.label}
                              </option>
                            )
                          })}
                      </Select>
                    </div>
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!itemForRead ? (
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
              {!itemForRead && (
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
