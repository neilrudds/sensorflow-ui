import React from "react";
import Components from "./components";

export default function Widget({ widget, onRemoveItem }) {
  return (
    <div className="h-full w-full relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-sm">
      <button
        type="button"
        className="absolute top-0 right-0 text-blue-gray-900 text-xs px-3 py-2 z-20"
        onClick={() => { onRemoveItem(widget._uid); console.log("Hit!"); }}
      >
        X
      </button>
      <div className="p-6">
        {Components(widget)}
      </div>
    </div>
  );
};