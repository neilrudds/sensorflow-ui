import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import SubHeader from "./SubHeader";

const Index = () => {
    return (
        <>
        <SubHeader title="Create a workspace" />
        <div className="w-full flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
        <div className="text-4xl text-gray-400">
            <BsFillExclamationTriangleFill />
        </div>
        <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">You haven't create any workspaces yet, create a workspace to get started.</h2>
        </div>
        </>
    );
}

export default Index;