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
      .delete(`/delete/${id}`, { headers })
      .then((res) => {
        setUserData(userData.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-full mx-10 my-10 min-h-[85%] bg-white drop-shadow-2xl shadow-2xl rounded-xl">
        <div className="flex justify-start mt-4 w-4">
          <AddUser />
        </div>
        <div className="px-9 py-2 overflow-scroll overflow-x-hidden overscroll-y-none max-h-[450px] mx-10">
          <div className="inline-block min-w-full py-2 ">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="-b font-medium dark:-neutral-500 max-w-full ">
                <tr className="text-2xl font-bold ">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="">Position</th>
                  <th className="px-8">Option</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(userData) &&
                  userData.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-600 hover:ease-in cursor-pointer transition ease-in duration-75"
                    >
                      <td className="whitespace-nowrap  font-medium  pl-2 ">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2">
                        {user.position}
                      </td>
                      <td className="whitespace-nowrap py-4  pl-2">
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
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
