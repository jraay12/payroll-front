import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import React from "react";
import { useParams } from "react-router-dom";
import Background from "../images/red.jpg";
const UserProfile = () => {
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const { id } = useParams();

  const { data: Profile, isLoading } = useQuery(["id"], async () => {
    const response = await axios.get(`/profile/` + id, { headers });
    const value = Object.values(response);
    return value;
  });

  if (!Array.isArray(Profile) || Profile.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh] w-full">
        <div className="relative flex flex-col items-center rounded-[20px] w-[80%] mx-auto p-4 bg-white h-[70%] bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img
              src={Background}
              className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img
                src={`http://127.0.0.1:8000/api/getPhoto/${Profile[0]?.photo}`}
                className="rounded-full w-20 h-20"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {Profile[0]?.name}
            </h4>
            <p className="text-base font-normal text-gray-600">
              {Profile[0].position}
            </p>
          </div>
          <div className="mt-6 mb-3 flex gap-14 md:!gap-14 w-full h-[50%]">
            <div className="flex h-full w-full gap-4">
              <div className="h-full min-w-max flex flex-col font-thin ">
                <h1 className="text-xl text-black font-black">Address</h1>
                <p className="text-[13px] mt-4">
                  Street : <span>{Profile[0].address.street}</span>
                </p>
                <p className="text-[13px] ">
                  City : <span>{Profile[0].address.city}</span>
                </p>
                <p className="text-[13px] ">
                  Zip Code : <span>{Profile[0].address.zip_code}</span>
                </p>
                <p className="text-[13px] ">
                  State : <span>{Profile[0].address.State}</span>
                </p>
                <p className="text-[13px] ">
                  Country : <span>{Profile[0].address.country}</span>
                </p>
              </div>
              <div className="border-r border-gray-400 h-full ml-[250px]"></div>

              <div className="flex flex-col w-full h-full gap-2 font-thin">
                <h1 className="text-xl text-black font-black">
                  Personal Information
                </h1>
                <p className="text-[13px] mt-4">{Profile[0].email}</p>
                <p className="text-[13px] ">{Profile[0].contact_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
