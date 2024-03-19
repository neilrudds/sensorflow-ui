import React from "react";
import ValueWidget from "./widgets/ValueWidget";
import ChartWidget from "./widgets/ChartWidget";

const Components = {
  value: ValueWidget,
  chart: ChartWidget
};

export default (block, data) => {
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block: block,
      data: data
    });
  }
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block._uid }
  );
};