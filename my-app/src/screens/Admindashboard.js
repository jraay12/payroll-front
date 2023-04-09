import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";
import { RiAdminFill } from "react-icons/ri";
import Button from "../components/Button";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    if (access_token === "" || access_token === null) {
      navigate("/");
    }

    fetch("http://127.0.0.1:8000/api/getUser/2")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserData(json.data);
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col">
      <div className="w-screen bg-blue-900 h-11 flex justify-between">
        <div className="flex items-center gap-2">
          <RiAdminFill className="ml-2" />
          <label className="text-[14px] text-white font-medium">Admin</label>
        </div>
        <div className="w-[90px] h-[90px] object-contain xsm:w-[70px] xsm:h-[70px] mt-2">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="flex items-center ">
          <Button label="Logout" onClick={handleLogout} />
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        Id
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-4 pl-[70px]">
                        Option
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(userData) &&
                      userData.map((user) => (
                        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td class="whitespace-nowrap px-6 py-4 font-medium">
                            {user.id}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                            {user.name}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                            {user.email}
                          </td>

                          <td class="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <div className=" bg-red-800 h-[40px] ">
                                <Button type="submit" label="Delete" />
                              </div>
                              <div className=" bg-blue-800 h-[40px] ">
                                <Button type="submit" label="Update" />
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
      </div>
    </div>
  );
};

export default Admindashboard;
