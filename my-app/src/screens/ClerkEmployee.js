import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

const ClerkEmployee = () => {
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const {
    data: UserData,
    isLoading,
    isError,
  } = useQuery(
    ["name"],
    async () => {
      const response = await axios.get(`/getUser`, { headers });
      const value = response?.data?.data?.filter(
        (item) => item.role_id === 2 || item.role_id === 3
      );
      return value;
    },
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true,
    }
  );


if(!Array.isArray(UserData) || UserData.length === 0){
  return null
}

  return (
    <div className="flex max-h-screen justify-center items-center w-full ">
      <div className="flex flex-col backdrop-blur-sm drop-shadow-2xl shadow-2xl rounded-xl max-h-[70%] min-h-[70%] w-[80%] shadow-black mx-10 my-10 border-2 border-dashed border-black">
        <div
          className={`${
            isLoading && "flex flex-col mt-40 items-center justify-center"
          } py-2 overflow-auto  overflow-x-hidden px-10`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <table className="min-w-max flex flex-col text-sm font-bold">
              {/* <thead className="flex justify-around">
                <div className="font-bold flex gap-20 -ml-10">
                  <p>ID</p>
                  <p>Name</p>
                  <p>Email</p>
                  <p className="ml-12">Position</p>
                  <p className="ml-20">Options</p>
                </div>
              </thead> */}
              <tbody>
                {Array.isArray(UserData) &&
                  UserData.map((user) => (
                    <div
                      key={user.id}
                      className="bg-blue-200 hover:bg-blue-400 rounded-3xl  hover:ease-in hover:scale-x-105 flex justify-around items-center gap-10 mt-4 cursor-pointer"
                    >
                      <img
                        src={`http://127.0.0.1:8000/api/getPhoto/${user.photo}`}
                        className="rounded-full w-10 h-10"
                      />

                      <p className="font-medium">{user.id}</p>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-sm font-semibold">{user.email}</p>
                      <p className="text-sm font-semibold">{user.position}</p>
                      <div className="py-4">
                        <div className="flex gap-2 font-bold">
                          <div className="text-white hover:scale-x-110 transition ease-in-out delay-150">
                            <Link
                              className="bg-yellow-600 h-[40px] w-[70px] flex items-center justify-center rounded-lg"
                              to={`/ClerkDashboard/Payroll/${user.id}`}
                            >
                              Payroll
                            </Link>
                          </div>
                          <div className="text-white hover:scale-x-110 transition ease-in-out delay-150">
                            <Link
                              className="bg-red-600 h-[40px] w-[100px] flex items-center justify-center rounded-lg"
                              to={`/ClerkDashboard/UpdateRate/${user.id}`}
                            >
                              Update Rate
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClerkEmployee;
