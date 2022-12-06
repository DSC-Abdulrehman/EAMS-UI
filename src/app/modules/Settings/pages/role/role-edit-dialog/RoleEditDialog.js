import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import * as actions from "../../../_redux/roles/rolesAction"
import { useRolesUIContext } from "../RolesUIContext"
import { RoleEditForm } from "./RoleEditForm"
import {RoleEditDialogHeader} from "./RoleEditDialogheader"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function RoleEditDialog({ id, show, onHide }) {
 
  //Role UI Context
  const rolesUIContext = useRolesUIContext()

  const rolesUIProps = useMemo(() => {
    return {
      initRole: rolesUIContext.initRole,
    }
  }, [rolesUIContext])

  //Role Redux State

  const dispatch = useDispatch()
  // const RoleState = useSelector((state) => {
  //   return state.roles
  // })

  const { currentState, actionsLoading, roleForEdit } = useSelector(
    (state) => ({
      currentState: state.roles,
      actionsLoading: state.roles.actionsLoading,
      roleForEdit: state.roles.roleForEdit,
    }),
    shallowEqual
  )

  //console.log("roleForEdit", roleForEdit)

  useEffect(() => {
    // server call for getting Role by id
    dispatch(actions.fetchRole(id))
  }, [id, dispatch])


  const saveRole = (roleValues) => {
    if(!id){
      dispatch(actions.createRole(roleValues))
      onHide()
    }else{
      const roleUpdatedFields = {
        id: id,
        name: roleValues.name
      }
      dispatch(actions.updateRole(roleUpdatedFields))
      onHide()
    }
    
  }

  // const saveRole = (role) => {
  //   if (!id) {
  //     // console.log("i'm in if and role is", role)
  //     dispatch(actions.createRole(role)).then(() => onHide())
  //   } else {
  //     // console.log("i'm in Else Section")
  //   }
  // }
  // console.log("RoleState", actionsLoading)
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RoleEditDialogHeader id={id} />
      <RoleEditForm
        saveRole={saveRole}
        actionsLoading={actionsLoading}
        onHide={onHide}
        role={roleForEdit || rolesUIProps.initRole}
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
