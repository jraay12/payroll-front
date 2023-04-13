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
  };
  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    if (access_token === "" || access_token === null) {
      navigate("/");
    }

    fetch("http://127.0.0.1:8000/api/getUser/2")
      .then((response) => response.json())
      .then((json) => {
        setUserData(Object.values(json.data));
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
  };

  // const handleDelete = async(id) => {
  //   const reponse = await fetch('http://127.0.0.1:8000/api/delete/${id}', {
  //   method: "DELETE",
  //   headers: headers

  //   })

  //   if (reponse.ok){
  //     console.log("Success");
  //     setUserData(userData.filter(user => user.id !== id));
  //     console.log(userData);
  //   }else{
  //     console.error("Error");
  //   }
  // }
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
        <div className="flex items-center">
          <Button label="Logout" onClick={handleLogout} />
        </div>
      </div>
      <div className="flex justify-start mt-4 w-4">
        <AddUser />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className="flex flex-col">
          <table className="w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 pl-[70px]">Option</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userData) &&
                userData.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
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

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex gap-2">
                        <div className=" bg-red-800 h-[40px] px-4">
                          <Button
                            type="submit"
                            label="Delete"
                            // onClick={() => handleDelete(user.id)}
                          />
                        </div>
                        <div className=" bg-blue-800 h-[40px] px-4 ">
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
  );
};

export default Admindashboard;
