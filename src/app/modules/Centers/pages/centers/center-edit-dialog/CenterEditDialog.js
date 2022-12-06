import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { CenterEditForm } from "./CenterEditForm"
import { CenterEditDialogHeader } from "./CenterEditDialogHeader"
import { useCentersUIContext } from "../CentersUIContext"
import * as actions from "../../../_redux/centersActions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function CenterEditDialog({ id, show, onHide, userForRead }) {
  const title = "CenterEditDialog"
  const centersUIContext = useCentersUIContext()
  const centersUIProps = useMemo(() => {
    return {
      initCenter: centersUIContext.initCenter,
      queryParams: centersUIContext.queryParams,
      secondQueryParams: centersUIContext.secondQueryParams,
    }
  }, [centersUIContext])
  console.log(
    "queryParams for Vcenter Vehicle",
    centersUIProps.secondQueryParams
  )

  // const newQueryParams = {
  //   ...centersUIProps.queryParams,
  //   centerId: parseInt(id),
  // }

  //console.log("newQueryParams", newQueryParams)
  const dispatch = useDispatch()
  const {
    actionsLoading,
    centerForEdit,
    roles,
    centers,
    isuserForRead,
    vehiclesForCenter,
    totalCount,
  } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      centerForEdit: state.centers.centerForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
      isuserForRead: state.users.userForRead,
      vehiclesForCenter: state.centers.vehiclesForCenter?.rows,
      totalCount: state.centers.vehiclesForCenter?.totalResults,
    }),
    shallowEqual
  )

  // console.log("vehiclesForCenter", vehiclesForCenter, totalCount)

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchCenter(id))
      dispatch(
        actions.fetchVehicles({
          ...centersUIProps.secondQueryParams,
          centerId: id,
        })
      )
    }
  }, [id, dispatch, centersUIProps.secondQueryParams])

  const saveCenter = (center) => {
    if (!id) {
      dispatch(actions.createCenter(center)).then((res) => {
        onHide()
      })
    } else {
      const centerUpdatedFields = {
        id: center.id,
        name: center.name,
        phoneNo: center.phoneNo,
        location: center.location,
        longitude: center.longitude,
        latitude: center.latitude,
      }
      dispatch(actions.updateCenter(centerUpdatedFields))
      onHide()
    }
  }

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CenterEditDialogHeader id={id} isUserForRead={userForRead} />
      <CenterEditForm
        saveCenter={saveCenter}
        center={centerForEdit || centersUIProps.initCenter}
        onHide={onHide}
        roles={roles}
        centers={centers}
        isUserForRead={userForRead}
        vehiclesForCenter={vehiclesForCenter}
        totalCount={totalCount}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Modal>
  )
}
