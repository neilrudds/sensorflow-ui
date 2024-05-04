// Code credit: https://www.storyblok.com/tp/react-dynamic-component-from-json

import React from "react";
import ValueWidget from "./widgets/ValueWidget";
import ChartWidget from "./widgets/ChartWidget";

/* Create a map between the JSON component name text and the actual Widget Component,
  this list can be expanded as additional components are added */
const Components = {
  value: ValueWidget,
  chart: ChartWidget
};

// Use React.createElement to dynamically create the element
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