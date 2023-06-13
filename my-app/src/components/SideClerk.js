import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Control from "../images/control.png";
import Logo from "../images/logo.png";
import User from "../images/User.png";
import Logs from "../images/Folder.png";
import Logout from "../images/logout.png";

const SideClerk = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const { id } = useParams();
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
      });
      sessionStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const menuItem = [
    {
      path: "/ClerkDashboard/Employee",
      name: "Employee",
      src: User,
    },
    {
      path: "/ClerkDashboard/PayrollLog",
      name: "Payroll Logs",
      src: Logs,
    },
    
  ];
  return (
    <div className="flex shadow-2xl bg-white">
      <div
        ref={sidebarRef}
        className={`${
          open ? "w-52" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300 md:${!open}`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 h-20 object-contain ${
              open && "rotate-[360deg]"
            }`}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col flex-grow items-center">
          <ul className="pt-6 mt-10 flex-grow">
            {menuItem.map((items, index) => (
              <NavLink
                key={index}
                to={items.path}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white font-semibold text-md items-center gap-x-4 
              ${items.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                }`}
              >
                <img src={items.src} alt={items.name} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {items.name}
                </span>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex justify-center ">
            <img src={Logout} className="object-contain h-5 w-5" alt="Logout" />
            <span className={`${!open && "hidden"} `}>
              <button
                className="text-black text-lg font-semibold ml-4 rounded-lg outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideClerk;
