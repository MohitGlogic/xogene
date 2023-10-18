import React from "react";
import "./loader.css";

export default function Loader() {
  var load = true;

  return (
    <div
      style={
        load
          ? { zIndex: "25", display: "block" }
          : { zIndex: "25", display: "none" }
      }
      className="overlayForLoader"
    >
      <div className="loaderComponent"></div>
    </div>
  );
}
