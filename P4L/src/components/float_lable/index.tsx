import React, { useState } from "react";

import "./index.css";

const FloatLabel = props => {
  let [focus, setFocus] = useState(false);
  const { children, label, value, focus: f } = props;

  if (f !== undefined) {
    focus = !!f;
  }

  const labelClass =
    focus || (value && value.length !== 0) ? "label label-float opacity-70" : "label text-lg opacity-70";

  return (
    <div
      className="float-label text-m"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
