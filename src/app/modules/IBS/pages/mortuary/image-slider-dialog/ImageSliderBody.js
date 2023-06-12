import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export function ImageSliderBody() {
  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default"></Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          //onClick={onHide}
          className="btn btn-light btn-elevate"
        >
          Cancel
        </button>

        <> </>

        <button
          type="submit"
          //onClick={() => handleSubmit()}
          className="btn btn-primary btn-elevate"
        >
          Save
        </button>
      </Modal.Footer>
    </>
  );
}
