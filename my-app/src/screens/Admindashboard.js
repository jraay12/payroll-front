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

  const access_token = sessionStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    Accept : "application/json",
  };

  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    if (access_token === "" || access_token === null) {
      navigate("/");
    }

  

    // Add a delay of 1 second before fetching user data
    const delay = 1000;
    const timerId = setTimeout(() => {
      fetchUser();
     
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [userData]);

  const fetchUser = async () => {
    const fetchResponse = await fetch(`http://127.0.0.1:8000/api/getUser/2`, {
      method: "GET",
      headers: headers
    });

    const value = await fetchResponse.json();
    if (fetchResponse.ok) {
      setUserData(Object.values(value.data));
    } else {
      console.error("No Data");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:8000/api/logout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
       
      });
      sessionStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleDelete = async(id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
      method: "DELETE",
      headers: headers
    })
  
    if (response.ok){
      setUserData(userData.filter(user => user.id !== id));
    }else{
      console.error("Error");
    }
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col overflow-hidden ">
      <div className="w-screen bg-blue-900 h-11 flex justify-between ">
        <div className="flex items-center gap-2">
          <RiAdminFill className="ml-2" />
          <label className="text-[14px] text-white font-medium">Admin</label>
        </div>
        <div className="w-[90px] h-[90px] object-contain xsm:w-[70px] xsm:h-[70px] mt-2">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="flex items-center px-5">
          <Button label="Logout" onClick={handleLogout}/>
        </div>
      </div>
      <div className="flex justify-start mt-4 w-4">
        <AddUser />
      </div>
      <div className="flex flex-col w-screen items-center justify-center">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 flex justify-center">
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(userData) &&
                    userData.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold">
                          {user.email}
                        </td>

                        <td className="whitespace-nowrap py-4">
                          <div className="flex gap-2">
                            <div className=" bg-red-800 h-[40px] w-[70px]">
                              <Button
                                type="submit"
                                label="Delete"
                                 onClick={() => handleDelete(user.id)}
                              />
                            </div>
                            <div className=" bg-blue-800 h-[40px] w-[70px]">
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
  );
};

export default Admindashboard;
