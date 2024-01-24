import React from "react";

export default function Widget({ id, onRemoveItem }) {
  return (
    <div className="h-full w-full relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-sm">
      <button
        type="button"
        className="absolute top-0 right-0 text-blue-gray-900 text-xs px-3 py-2 z-20"
        onClick={() => { onRemoveItem(id); console.log("Hit!"); }}
      >
        X
      </button>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {id}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          The place is close to Barceloneta Beach and bus stop just 2 min by walk
          and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </p>
      </div>
    </div>
  )
}