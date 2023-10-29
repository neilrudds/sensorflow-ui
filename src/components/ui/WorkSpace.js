import { BsFillExclamationTriangleFill } from "react-icons/bs";

const WorkspaceContent = () => {
    return (
        <main className="flex-1 py-6 px-4 relative">
        <h1 className="text-2xl pb-4 font-semibold">Home Page</h1>
        <div className="flex justify-between ...">
          <div className="font-semibold text-xl">Dashboard 1</div>
          <div>Toggle Switch</div>
        </div>
        <p><br/><br/></p>
        <div className="w-full flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
          <div className="text-4xl text-gray-400">
            <BsFillExclamationTriangleFill />
          </div>
          <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">Welcome to the workspace area, this section is still a work in progress.</h2>
        </div>
      </main>
    );
}

export default WorkspaceContent;