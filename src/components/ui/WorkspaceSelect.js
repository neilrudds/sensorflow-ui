import { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import withClickOutside from "../../utils/withClickOutside";
import WorkspaceContext from "../../context/workspace-context";
import AuthContext from "../../context/auth-context";
import AddWorkspaceModal from "../modal/AddWorkspaceModal";

const WorkspaceSelect = forwardRef(({ props, open, setOpen }, ref) => {
    const { isNavOpen, openNav } = props;
    let auth = useContext(AuthContext);
    let user = JSON.parse(auth.user);
    const { workspace, setWorkspace } = useContext(WorkspaceContext);
    const navigate = useNavigate();

    return (
        <div className={`${isNavOpen ? "p-4" : "p-0"} relative focus:ring-0 focus:outline-none`}>
            <button className="max-w-full group block focus:outline-none focus:ring-0" type="button" aria-haspopup="true" aria-expanded="false" onClick={() => { setOpen(!open); openNav(true); }}>
                <div className="flex items-center w-full justify-between space-x-3 focus:ring-0">
                    <div>
                        <p className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-400 text-white font-medium text-xl">
                            <span>{workspace.name.charAt(0)}</span>
                        </p>
                    </div>
                    {isNavOpen &&
                        <>
                            <div className="shrink-1 truncate">
                                <p className="text-base text-left truncate font-medium text-white group-hover:text-white" title={workspace.name}>{workspace.name}</p>
                                <p className="text-sm text-left truncate font-medium text-gray-500 group-hover:text-white" title={user.userName}>{user.userName}</p>
                            </div>
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </>
                    }
                </div>
            </button>
            <section ref={ref}>
                <div className={`z-10 mx-3 origin-top absolute mt-2 right-0 left-0 rounded-md shadow-lg bg-white divide-y divide-gray-200 focus:outline-none focus:ring-0 opacity-100 ${!open && "hidden"}`}>
                    <div className="focus:outline-none focus:ring-0 overflow-y-auto pb-1 max-h-[600px]">
                        {workspace.allWsData && workspace.allWsData.map((ws, index) => (
                            <div className="py-1 overflow-y-auto divide-y divide-gray-200">
                                <a className={`text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-0 focus:outline-none flex items-center space-x-3 ${workspace.name === ws.name && "bg-blue-100"}`} onClick={() => { setWorkspace({...workspace, id: ws.id, name: ws.name, currWsData: workspace.allWsData.filter((d) => d.id.includes(ws.id)) }); navigate('/' + ws.name); setOpen(false) }} role="none">
                                    <p className="h-7 w-7 rounded-full flex items-center justify-center bg-gray-600 text-white font-medium text-sm flex-shrink-0" role="none">
                                        <span role="none">{ws.name.charAt(0)}</span>
                                    </p>
                                    <div className="truncate font-medium" role="none">
                                        <span className="text-sm" title="FirstWorkspace" role="none">{ws.name}</span>
                                        <div className="flex space-x-2 items-center text-xs text-gray-500" role="none">
                                            <span role="none">{ws.deviceCount} Devices</span>
                                            <span role="none">|</span
                                            ><span role="none">{ws.userCount} Members</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 divide-y divide-gray-200" role="none">
                            <AddWorkspaceModal />
                            <button type="button" className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-0 focus:outline-none" tabindex="-1">Account Settings</button>
                            <button
                                type="button"
                                className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-0 focus:outline-none"
                                onClick={() => { auth.signout(() => navigate('/')); }}
                                tabindex="-1">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default withClickOutside(WorkspaceSelect);