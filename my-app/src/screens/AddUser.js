import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import DropDownInput from "../components/DropdownInput"
const AddUser = () => {
  const navigate = useNavigate()
  let access_token = sessionStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    position: "",
    street: "",
    city: "",
    zip_code: "",
    state: "",
    country: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`/register`, value, { headers })
      .then(res => {
        navigate("/AdminDashboard/Employee")
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex w-full h-full justify-center items-center ">
      <div className="flex flex-col backdrop-blur-sm rounded-xl min-h-[50%] drop-shadow-2xl shadow-2xl w-full mx-10 my-4 border-2 border-dashed">
        <h1 className="font-bold mt-[10px] ml-[10px] text-white">
          Register Employee
        </h1>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-2 flex-wrap">
            <div className="flex mt-5">
              <div className="w-[50%] ">
                <Input placeholder="Name" label="Name" onChange={(e) => setValue({...value, name: e.target.value})} />
              </div>
              <div className="w-[50%]">
                <Input placeholder="Email" label="Email" onChange={(e) => setValue({...value, email: e.target.value})}/>
              </div>
            </div>
            <div className="flex">
              <div className="w-[40%]">
                <Input placeholder="Password" label="Password" type="password" onChange={(e) => setValue({...value, password: e.target.value})} />
              </div>
              <div className="w-[30%] ">
                <Input label="Contact Number" placeholder="Contact Number" onChange={(e) => setValue({...value, contact_number: e.target.value})}/>
              </div>
              <div className="w-[30%]">
              <Input label="Position" placeholder="Position" onChange={(e) => setValue({...value, position: e.target.value})}/>

              </div>
            </div>
            <h1 className="font-bold mt-[10px] ml-[10px] text-white">
              Address Information
            </h1>
            <div className="flex">
              <div className="w-[25%]">
                <Input label="Street" placeholder="12-28 St." onChange={(e) => setValue({...value, street: e.target.value})}/>
              </div>
              <div className="w-[50%]">
                <Input label="City" placeholder="Davao City" onChange={(e) => setValue({...value, city: e.target.value})}/>
              </div>

              <div className="w-[25%]">
                <Input label="Zip Code" placeholder="9000" onChange={(e) => setValue({...value, zip_code: e.target.value})}/>
              </div>
            </div>
            <div className="flex">
              <div className="w-[50%]">
                <Input label="State" placeholder="Misamis Oriental" onChange={(e) => setValue({...value, state: e.target.value})}/>
              </div>
              <div className="w-[50%]">
                <Input label="Country" placeholder="Philippines" onChange={(e) => setValue({...value, country: e.target.value})}/>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 w-[100px] rounded-md my-3 ml-10">
            <Button label="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
