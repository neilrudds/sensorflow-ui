import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import SubHeader from "./SubHeader";
import AuthStatus from "./AuthStatus";

export default function WorkspaceContent() {
  let { workspaceId } = useParams();

    return (
      <>
        <AuthStatus />
        <SubHeader title={workspaceId} />
        <div className="flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
          <div className="text-4xl text-gray-400">
            <BsFillExclamationTriangleFill />
          </div>
          <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">Welcome to the workspace ({workspaceId}) area, this section is still a work in progress.</h2>
        </div>
      </>
    );
}