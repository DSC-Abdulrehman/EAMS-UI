import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls"
import * as actions from "../../../_redux/usersActions"
import { useUsersUIContext } from "../UsersUIContext"

export function UserDeleteDialog({ id, show, onHide }) {
  // Customers UI Context
  const usersUIContext = useUsersUIContext()
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
    }
  }, [usersUIContext])

  // Customers Redux state
  const dispatch = useDispatch()
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual
  )

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch])

  const deleteUser = () => {
    // server request for deleting customer by id
    dispatch(actions.deleteUser(id)).then(() => {
      onHide()
      // refresh list after deletion
      dispatch(actions.fetchUsers(usersUIProps.queryParams))
      // clear selections list
      // usersUIProps.setIds([]);
      // closing delete modal
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">User Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this user?</span>
        )}
        {isLoading && <span>user is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteUser}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
