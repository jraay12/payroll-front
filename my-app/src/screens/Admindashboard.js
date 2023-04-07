import React, { useEffect } from "react";
import AddUser from "./AddUser";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";
import { RiAdminFill } from "react-icons/ri";
const Admindashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    if (access_token === "" || access_token === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex">
      <div className="w-screen bg-blue-900 h-11 flex justify-between">
        <div className="flex items-center gap-2">
          <RiAdminFill className="ml-2" />
          <label className="text-[14px] text-white font-medium">Admin</label>
        </div>
        <div className="w-[90px] h-[90px] object-contain xsm:w-[70px] xsm:h-[70px] mt-2">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="flex items-center">
          <DropDownMenu />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
