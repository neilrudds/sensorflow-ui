import React from 'react'

export default props => (
  <>
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {props.block.title}
    </h5>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      I am a Chart Widget with the headline:
      {props.block.headline}
    </p>
  </>
);