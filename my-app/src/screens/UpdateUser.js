import React, { useState } from "react";

const UpdateUser = ({ userData, setUserData }) => {
  
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  console.log(userData);

  return 
  <>
  
  
  </>
};

export default UpdateUser;
