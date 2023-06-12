import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CoffinEditForm } from "./CoffinEditForm";
import { CoffinEditDialogHeader } from "./CoffinEditDialogHeader";
import * as actions from "../../../_redux/coffin/reduxActions";
import { useParams } from "react-router-dom";

const initValue = {
  countryId: 0,
  cityId: 0,
  statusId: 0,
  SN: 0,
  dateTime: "",
  fullNameOfTheDeceased: "",
  fatherNameOfTheDeceased: "",
  surname: "",
  cast: "",
  religion: "",
  nativePlace: "",
  age: 0,
  gender: "",
  dateTimeofDeath: "",
  causeOfDeath: "",
  placeOfDeath: "",
  reporterCnic: "",
  reporterName: "",
  reporterPhNo: "",
  description: "",
};

export function CoffinEditDialog({ show, onHide, userForRead }) {
  const dispatch = useDispatch();
  let { ibfId, mfId } = useParams();
  const [initialValue, setInitialValue] = useState(initValue);

  const mortuary = useSelector((state) => state.mortuary);
  //console.log("mortuary", mortuary);

  const { infoForEdit } = mortuary;

  useEffect(() => {
    if (infoForEdit.fullNameOfTheDeceased) {
      initValue.fullNameOfTheDeceased = infoForEdit.fullNameOfTheDeceased;
    }
    if (infoForEdit.fatherNameOfTheDeceased) {
      initValue.fatherNameOfTheDeceased = infoForEdit.fatherNameOfTheDeceased;
    }
    if (infoForEdit.statusId) {
      initValue.statusId = infoForEdit.statusId;
    }
    if (infoForEdit.countryId) {
      initValue.countryId = infoForEdit.countryId;
    }
    if (infoForEdit.cityId) {
      initValue.cityId = infoForEdit.cityId;
    }
  }, [infoForEdit]);

  const saveCenter = (props) => {
    if (ibfId) {
      props.ibfId = ibfId;
    }
    if (mfId) {
      props.mfId = mfId;
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
      <CoffinEditDialogHeader />

      <CoffinEditForm
        saveCenter={saveCenter}
        initialValue={initialValue}
        onHide={onHide}
      />
    </Modal>
  );
}
