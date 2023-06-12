import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function InfoEditDialogHeader({ id, isUserForRead }) {
  const [title, setTitle] = useState("");
  const personalInfoState = useSelector((state) => state.personalInformation);
  const { actionsLoading } = personalInfoState;

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
