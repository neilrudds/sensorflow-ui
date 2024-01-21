import React from "react";

export default function Widget({ id, onRemoveItem }) {
  return (
    <div className="w-full h-full flex">
        <a href="#" class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{id}</h5>
        </a>
    </div>
  )
}