import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function MainContent() {
    const [open, setOpen] = useOutletContext();
    let { workspaceId } = useParams();

    return (
        <main className="flex-1 py-6 px-4 relative">
        <div className="pb-6">
          <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}></AiFillEnvironment>
          <h1 className="text-gray-500 origin-left font-medium text-2xl duration-300">SensorFlow</h1>
        </div>
        <div className="flex justify-between ...">
          <div className="font-semibold text-xl">{workspaceId}</div>
          <div>Toggle Switch</div>
        </div>
        <p><br/><br/></p>
        <div className="flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
          <div className="text-4xl text-gray-400">
            <BsFillExclamationTriangleFill />
          </div>
          <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">This dashboard has no content, yet. Start by activating the edit mode using the switch in the top right.</h2>
        </div>
      </main>
    );
}