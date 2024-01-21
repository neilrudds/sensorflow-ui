import React, { useState, useContext } from "react";
import CustomModal from "../modal/Modal";
import { RiAddFill } from "react-icons/ri";
import WorkspaceContext from "../../context/workspace-context";
import AuthContext from "../../context/auth-context";
import { apiDashboard } from "../../utils/apiManager/apiDashboard";
import { apiWorkspace } from '../../utils/apiManager/apiWorkspace';

const AddDashboardModal = (props) => {
  const { workspace, setWorkspace } = useContext(WorkspaceContext);
  let auth = useContext(AuthContext);
  let user = JSON.parse(auth.user);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState(null);
  const { createDashboard } = apiDashboard();
  const { getWorkspaceByUsername } = apiWorkspace();

  const handleChange = (event) => {
    setPostId(null); setErrorMessage(null);
    const { name, value } = event.target;
    setName(value);
  }

  const handleSubmit = async () => {
    // Reset errors
    setPostId(null); setErrorMessage(null);

    const params = { name: name, workspaceid: workspace.id };
    try {
      createDashboard(params)
        .then((res) => {
          console.log(res);
          setPostId(res.Id);
        })
      try {
        getWorkspaceByUsername(user.userName)
          .then((res) => {
            console.log(res);
            setWorkspace({ ...workspace, currWsData: res.filter((d) => d.id.includes(workspace.id)), allWsData: res });
          });
      } catch (error) {
        setErrorMessage(error.toString());
        console.error('There was an error; ', error);
      }
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.toString());
      console.error('There was an error; ', error);
    }
  }

  return (
    <>
      <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
        onClick={() => { setShowModal(true); setErrorMessage(null) }}
      >
        <span className="text-2xl block float-left">
          <RiAddFill />
        </span>
        <span className={`text-base font-medium flex-1 duration-200 ${!props.open && "hidden"}`}>
          Add Dashboard
        </span>
      </li>
      <CustomModal
        onClose={() => setShowModal(false)}
        visible={showModal}>(
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-10 mx-auto max-w-5xl">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-dark-purple px-4 py-3 sm:px-6">
                <h1 className="text-lg text-gray-300 font-bold mt-2 pr-48">Add Dashboard</h1>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    {errorMessage &&
                      <h3 className="text-red-500"> {errorMessage} </h3>
                    }
                    <div className="flex flex-col gap-2 py-4">
                      <label htmlFor="name">Name</label>
                      <input id="name" type="name" className="py-2 px-4 border border-gray-200 rounded-lg" placeholder="My IoT Dashboard" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-dark-purple text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSubmit()}
                >
                  Add Dashboard
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        ) </CustomModal>
    </>
  );
};

export default AddDashboardModal;