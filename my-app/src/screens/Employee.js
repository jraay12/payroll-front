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
    const delay = 1500;
    const timerId = setTimeout(() => {
      fetchUser();
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [userData]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/getUser`, {
        headers,
      });

      if (response.status === 200) {
        const value = await response.data;
        const users = Object.values(value.data);
        const filteredData = users.filter((item) => item.role_id === 2);
        setUserData(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`, {
        headers: headers,
      });
      if (response.status === 200) {
        setUserData(userData.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen mx-10 my-10 max-h-[550px] max-w-7xl  bg-white drop-shadow-2xl shadow-2xl rounded-xl">
      <div className="flex justify-start mt-4 w-4">
        <AddUser />
      </div>
      <div className="px-9 py-2 overflow-scroll overflow-x-hidden max-h-[450px] mx-10">
        <div className="inline-block min-w-full py-2 ">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500 max-w-full">
              <tr className="text-2xl font-bold">
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
                  <tr key={user.id}>
                    <td className="whitespace-nowrap  font-medium">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold">
                      {user.position}
                    </td>
                    <td className="whitespace-nowrap py-4 ">
                      <div className="flex gap-2">
                        <div className=" bg-red-800 h-[40px] w-[70px] ">
                          <Button
                            type="submit"
                            label="Delete"
                            onClick={() => handleDelete(user.id)}
                          />
                        </div>
                        <div className="flex justify-center items-center text-white ">
                          <Link
                            className=" bg-blue-800 h-[40px] w-[70px]"
                            to={`/AdminDashboard/Edit/${user.id}`}
                          >
                            EDIT
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
