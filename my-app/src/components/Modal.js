import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import DropdownInput from "../components/DropdownInput";
import axios from "../api/axios";

const Modal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  let access_token = sessionStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${access_token}` };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("password", password);

    await axios
      .post(`/register`, formData, { headers })
      .then((res) => {
        setIsRegistered(false);
        setTimeout(() => {
          setIsRegistered(true);
          props.onClick();
        }, 1000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex w-screen h-">
        <div className="flex flex-col items-center bg-gradient-to-r h-screen w-screen from-sky-500 to-indigo-500 drop-shadow-2xl shadow-2xl gap-10 rounded-2xl mt-2">
          <label className="font-bold mt-4 text-2xl">
            Employee Registration
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
