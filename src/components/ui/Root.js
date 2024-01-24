import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsPerson } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineFileText, AiOutlineLogout, AiOutlineSetting, AiOutlineMail, AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill, RiAddFill } from "react-icons/ri";
import WorkspaceSelect from "./WorkspaceSelect"
import WorkspaceContext from "../../context/workspace-context";
import AuthContext from "../../context/auth-context";
import AddDashboardModal from "../modal/AddDashboardModal";
import { apiWorkspace } from '../../utils/apiManager/apiWorkspace';

export default function Root() {
  const { workspace, setWorkspace } = useContext(WorkspaceContext);
  const { getWorkspaceByUsername} = apiWorkspace();
  let auth = useContext(AuthContext);
  let user = JSON.parse(auth.user);
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkspaceByUsername(user.userName)
      .then((res) => {
        return res;
      })
      .then((data) => {
        setWorkspace({ id: data[0].id, name: data[0].name, currWsData: data.filter((d) => d.id.includes(data[0].id)), allWsData: data });
        navigate('/' + data[0].name + '/devices');
      });
  }, []);

  const Menus = [
    { title: "Devices", spacing: true, icon: <AiOutlineFileText /> },
    { title: "Reports", icon: <BsFillImageFill /> },
    { title: "Members", icon: <AiOutlineBarChart /> },
    { title: "Workspace", icon: <AiOutlineMail /> },
    { title: "Profile", spacing: true, icon: <BsPerson /> },
    { title: "Setting", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout /> },
  ];

  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-24 border border-dark-purple cursor-pointer z-10
          ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}
        />
        <WorkspaceSelect isNavOpen={open} openNav={setOpen} />
        <ul className="pt-2">

          {workspace.currWsData && workspace.currWsData[0].dashboards.map((db, index) => (
            <>
              <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2" onClick={() => navigate('/' + workspace.name + '/dashboard/' + db.id)}>
                <span className="text-2xl block float-left">
                  <RiDashboardFill />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                  {db.name}
                </span>
              </li>
            </>
          ))}

          <AddDashboardModal open={open} />

          {Menus.map((menu, index) => (
            <>
              <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiAddFill />}
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
                )}
              </li>
              {menu.submenu && subMenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md">
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <main className="flex-1 py-6 px-4 relative bg-slate-50">
        <div className="pb-6">
          <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}></AiFillEnvironment>
          <h1 className="text-gray-500 origin-left font-medium text-2xl duration-300">SensorFlow</h1>
        </div>
        <Outlet context={[open, setOpen]} />
      </main>
    </div>
  );
}