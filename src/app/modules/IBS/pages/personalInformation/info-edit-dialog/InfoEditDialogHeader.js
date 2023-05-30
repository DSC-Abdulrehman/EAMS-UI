import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function InfoEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");

  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.centers.actionsLoading,
    }),
    shallowEqual
  );

  //console.log("actionsLoading", actionsLoading)

  useEffect(() => {
    let _title = id ? "" : "Add New Info";
    if (id) {
      _title = `Ibs Form`;
    } else {
      _title = `Add New Info`;
    }
    setTitle(_title);
  }, [id, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
