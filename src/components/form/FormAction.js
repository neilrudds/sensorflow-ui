export default function FormAction(props) {
    const { handleSubmit, type='Button', action='submit', text } = props;

    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={handleSubmit}>
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}