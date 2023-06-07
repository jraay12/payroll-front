import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";


const Employee = () => {

  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };


  const { data: UserData  } = useQuery(["name"], async() => {
    const response =  await axios.get(`/getUser`, { headers });
    return response.data.data.filter((item) => item.role_id === 2)
    
  }, {
    refetchInterval: 500,
    refetchIntervalInBackground: true
  });


  //Handle Delete
  const handleDelete = async (id) => {
    await axios
      .delete(`/users/${id}`, { headers })
      .then((res) => {
        console.log("Deleted Succesfully")
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen justify-center items-center w-full">
      <div className="flex flex-col backdrop-blur-sm drop-shadow-2xl shadow-2xl rounded-xl min-h-[80%] w-[80%] mx-10 my-10 border-2 border-dashed">
        <div className=" py-2 overflow-auto overflow-x-hidden px-10">
          <table className="min-w-full text-justify text-sm font-bold text-white px-20">
            <thead >
              <tr className="font-bold">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th className="pl-20">Options</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(UserData) &&
                UserData.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-600 hover:ease-in cursor-pointer"
                  >
                    <td className=" font-medium   ">{user.id}</td>
                    <td className="text-sm font-semibold  ">{user.name}</td>
                    <td className="text-sm font-semibold  ">
                      {user.email}
                    </td>
                    <td className="text-sm font-semibold  ">
                      {user.position}
                    </td>
                    <td className=" py-4  ">
                      <div className="flex gap-2 font-bold">
                        <div className=" bg-red-800 h-[40px] w-[70px] hover:scale-x-110 rounded-lg ">
                          <Button
                            type="submit"
                            label="Delete"
                            onClick={() => handleDelete(user.id)}
                          />
                        </div>
                        <div className=" text-white hover:scale-x-110 ">
                          <Link
                            className=" bg-blue-800 h-[40px] w-[70px] flex items-center justify-center rounded-lg"
                            to={`/AdminDashboard/Edit/${user.id}`}
                          >
                            Edit
                          </Link>
                        </div>
                        <div className=" text-white hover:scale-x-110 transition ease-in-out delay-150">
                          <Link
                            className=" bg-yellow-600 h-[40px] w-[70px] flex items-center justify-center rounded-lg"
                            to={`/AdminDashboard/Payroll/${user.id}`}
                          >
                            Payroll
                          </Link>
                        </div>
                        <div className=" text-white hover:scale-x-110 transition ease-in-out delay-150">
                          <Link
                            className=" bg-yellow-600 h-[40px] w-[100px] flex items-center justify-center rounded-lg"
                            to={`/AdminDashboard/UpdateRate/${user.id}`}
                          >
                            Update Rate
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
