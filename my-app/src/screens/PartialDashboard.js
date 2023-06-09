import React, {useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Side from "../components/Side";
const PartialDashboard = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   let access_token = sessionStorage.getItem("access_token");
  //   if (access_token === "" || access_token === null) {
  //     navigate("/");
  //   }
  // }, [])

  return (
    <div className="flex min-h-screen bg-background bg-cover min-w-max ">
      <Side/>
      <Outlet/>
    </div>
  );
};

export default PartialDashboard;
