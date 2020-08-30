import React from "react";
import { SketchField, Tools } from "react-sketch";

const SketchFieldDemo = () => {
  return (
    <SketchField
      width="1024px"
      height="768px"
      tool={Tools.Pencil}
      lineColor="red"
      lineWidth={10}
      undoSteps={11}
      defaultValue
      value
      className="test"
    />
  );
};

export default SketchFieldDemo;
