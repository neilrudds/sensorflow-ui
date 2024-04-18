export default props => (
  <>
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {props.block.title}
    </h5>
    <p className='absolute top-12'>
      {props.block.headline}
    </p>
    <p className="block font-sans text-5xl antialiased font-bold leading-relaxed absolute bottom-10">
      {props.data ? props.data + ".00" : "0.00"}
    </p>
  </>
);