import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import Button from "../components/Button";
import UpdateUser from "./UpdateUser";

const Employee = () => {
  let access_token = sessionStorage.getItem("access_token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

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
    const response = await fetch(`http://127.0.0.1:8000/api/getUser`, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const value = await response.json();
      const users = Object.values(value.data);
      const filteredData = users.filter((item) => item.role_id === 2);
      setUserData(filteredData);
    } else {
      console.error("No Data");
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    if (response.ok) {
      setUserData(userData.filter((user) => user.id !== id));
    } else {
      console.error("Error");
    }
  };

  return (
    <div className="w-screen mx-10 my-10 max-h-[550px] max-w-7xl drop-shadow-2xl shadow-2xl">
      <div className="flex justify-start mt-4 w-4">
        <AddUser />
      </div>
      <div className="px-9 py-2 overflow-scroll overflow-x-hidden max-h-[450px] mx-10">
          <div className="inline-block min-w-full py-2 ">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 max-w-full">
                <tr className="text-2xl font-bold">
                  <th >
                    ID
                  </th>
                  <th >
                    Name
                  </th>
                  <th >
                    Email
                  </th>
                  <th className="">
                    Position
                  </th>
                  <th className="px-8">
                    Option
                  </th>
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
                          <div className=" bg-blue-800 h-[40px] w-[70px]">
                            <Button
                              type="submit"
                              label="Update"
                              onClick={() => navigate("/Update")}
                            />
                            <UpdateUser
                              userData={userData}
                              setUserData={setUserData}
                            />
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
