import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MortuaryEditForm } from "./MortuaryEditForm";
import { MortuaryEditDialogHeader } from "./MortuaryEditDialogHeader";
import * as actions from "../../../_redux/mortuary/reduxActions";
import { useParams, useHistory } from "react-router-dom";

const initValue = {
  images: "",
  SN: "",
  countryId: "",
  cityId: "",
  hospitalId: "",
  statusId: "",
  ibfId: "",
  dateTime: "",
  fullNameOfTheDeceased: "",
  fatherNameOfTheDeceased: "",
  Address: "",
  callerCnic: "",
  callerName: "",
  callerPhNo: "",
  description: "",
  mortuaryReachdateTime: "",
  dischargeFromMortuaryDateTime: "",
};

export function MortuaryEditDialog({ show, onHide, userForRead }) {
  const dispatch = useDispatch();
  let { ibfId } = useParams();
  const history = useHistory();

  const [initialValue, setInitialValue] = useState(initValue);

  const saveCenter = (props) => {
    if (ibfId) {
      props.ibfId = ibfId;
    }
    dispatch(actions.createInfo(props)).then((res) => {
      onHide();
    });
  };

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MortuaryEditDialogHeader />

      <MortuaryEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
        isUserForRead={userForRead}
      />
    </Modal>
  );
}
