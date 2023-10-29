import { useState } from 'react';
import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsPerson, BsReverseLayoutTextSidebarReverse, BsSearch } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineFileText, AiOutlineLogout, AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import WorkspaceSelect from "./WorkspaceSelect"
import { Outlet } from 'react-router-dom';

const Root = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard" },
    { title: "Pages", icon: <AiOutlineFileText /> },
    { title: "Media", spacing: true, icon: <BsFillImageFill /> },
    {
      title: "Projects",
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" }
      ],
    },
    { title: "Analytics", icon: <AiOutlineBarChart /> },
    { title: "Inbox", icon: <AiOutlineMail /> },
    { title: "Profile", spacing: true, icon: <BsPerson /> },
    { title: "Setting", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout /> },
  ];

  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort 
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer 
          ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}
        />
        {/*
        <div className={`flex items-center rounded-md bg-light-white ${open ? "px-4" : "px-2.5"} mt-6 py-2`}>
          <BsSearch className={`text-white text-lg block float-left cursor-pointer ${ open && "mr-2"}`} />
          <input type={"search"} placeholder="Search" className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}></input>
        </div>
        */}
        <WorkspaceSelect />
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
              )}
            </li>
            {menu.submenu && subMenuOpen && open &&(
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
      <Outlet context={[open, setOpen]}/>
    </div>
  );
}

export default Root;