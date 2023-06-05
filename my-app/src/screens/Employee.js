import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "../api/axios";

const Employee = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    return [];
  });

  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(() => {
      fetchUser();
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [userData]);

  //fetch Data
  const fetchUser = async () => {
    await axios
      .get(`/getUser`, { headers })
      .then((res) => {
        const value = res.data;
        const users = Object.values(value.data);
        const filteredData = users.filter((item) => item.role_id === 2);
        setUserData(filteredData);
        
      })
      .catch((err) => console.error(err));
  };

  //Handle Delete
  const handleDelete = async (id) => {
    await axios
      .delete(`/users/${id}`, { headers })
      .then((res) => {
        setUserData(userData.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center ">
      <div className="flex flex-col backdrop-blur-sm drop-shadow-2xl shadow-2xl rounded-xl min-h-[50%] w-full mx-10 my-10 border-2 border-dashed">
        <div className=" py-2 overflow-auto overflow-x-hidden px-10">
          <table className="min-w-full text-left text-sm font-bold text-white ">
            <thead >
              <tr className="font-bold text-left">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th className="pl-20">Options</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userData) &&
                userData.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-600 hover:ease-in cursor-pointer transition ease-in duration-75"
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
