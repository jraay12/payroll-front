import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Control from "../images/control.png";
import Logo from "../images/logo.png";
import User from "../images/User.png";
import payroll from "../images/payroll.png";
import Logout from "../images/logout.png"
const Side = () => {
  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
      });
      sessionStorage.removeItem("access_token");
      window.location.reload();
    } catch (error) {
      console.error();
    }
  };

  const menuItem = [
    {
      path: "/PartialDashboard/Employee",
      name: "Employee",
      src: User,
    },
    {
      path: "/PartialDashboard/Payroll",
      name: "Payroll",
      src: payroll,
      
    },
  ];
  return (
    <div className="flex drop-shadow-2xl shadow-2xl max-h-screen">
      <div
        className={` ${
          open ? "w-52" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <div className="flex flex-col gap-80 ">
          <ul className="pt-6 mt-10 ">
            {menuItem.map((items, index) => (
              <NavLink
                key={index}
                to={items.path}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white font-semibold text-md items-center gap-x-4 
              ${items.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={items.src} />{" "}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {items.name}
                </span>
              </NavLink>
            ))}
          </ul>
          <div className=" flex ml-2 items-center">
            <img src={Logout} className="object-contain h-5 w-5" />
            <span className={`${!open && "hidden"}`}>
              <button
                className="text-black text-lg font-semibold  ml-4 py-2 rounded-lg"
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

export default Side;
