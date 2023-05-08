import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Control from "../images/control.png";
import Logo from "../images/logo.png";
import Button from "./Button";
const Side = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
      });
      sessionStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error();
    }
  };

  const menuItem = [
    {
      path: "/PartialDashboard/Employee",
      name: "Employee",
    },
    {
      path: "/PartialDashboard/Attendance",
      name: "Attendance",
    },
    {
      path: "/PartialDashboard/Payroll",
      name: "Payroll",
    },
  ];
  return (
    <div className="flex drop-shadow-2xl shadow-2xl">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
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
        <div className="flex flex-col gap-52">
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
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {items.name}
                </span>
              </NavLink>
            ))}
          </ul>
          <div className="py-2 px-2 bg-red-800 rounded-lg">
            <Button label="LOGOUT" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Side;
