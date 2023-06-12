import React, { useEffect } from "react";
import { InfoImageSlider } from "../info-image-slider/InfoImageSlider";
import ReactDOM from "react-dom";

const OpenModalInNewWindow = () => {
  useEffect(() => {
    const newWindow = window.open("", "", "width=400,height=400");
    newWindow.document.title = "Modal Window";

    // Render the modal content in the new window
    ReactDOM.render(
      <React.StrictMode>
        <InfoImageSlider handleClose={newWindow.close} />
      </React.StrictMode>,
      newWindow.document.body
    );
  }, []);

  return null;
};

export default OpenModalInNewWindow;
