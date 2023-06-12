import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ImageSliderBody } from "./ImageSliderBody";
import { ImageSliderDialogHeader } from "./ImageSliderDialogHeader";
import { useModuleUIContext } from "../MortuaryUIContext";

export function ImageSliderDialog({ show, onHide, userForRead }) {
  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ImageSliderDialogHeader />

      <ImageSliderBody />
    </Modal>
  );
}
