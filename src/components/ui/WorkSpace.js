import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import SubHeader from "./SubHeader";

const WorkspaceContent = () => {
  let { workspaceId } = useParams();

    return (
      <>
        <SubHeader title={workspaceId} />
        <div className="w-full flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
          <div className="text-4xl text-gray-400">
            <BsFillExclamationTriangleFill />
          </div>
          <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">Welcome to the workspace ({workspaceId}) area, this section is still a work in progress.</h2>
        </div>
      </>
    );
}

export default WorkspaceContent;