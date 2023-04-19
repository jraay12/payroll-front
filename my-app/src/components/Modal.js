import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const Modal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);

  const access_token = sessionStorage.getItem("access_token");

  const headers = { Authorization: `Bearer ${access_token}` };

  console.log(isRegistered);
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`http://localhost:8000/api/register`, {
      method: "POST",
      body: formData,
      headers: headers,
    });

    if (response.ok) {
      console.log("Success");
      setIsRegistered(false);
      setTimeout(() => {
        setIsRegistered(true);
        props.onClick();
      }, 1000);
    } else {
      console.error("An error occurred while registering user.");
    }
  };

  return (
    <div>
      {isRegistered && (
        <div className="flex flex-col items-center h-[400px] w-[400px] bg-gradient-to-r from-sky-500 to-indigo-500 drop-shadow-2xl shadow-2xl gap-10 rounded-2xl mt-5">
          <label className="font-bold mt-4 text-2xl">Add User</label>
          <div className="w-full mx-4 flex flex-col gap-4">
            <form onSubmit={(e) => handleRegister(e)} method="POST">
              <Input
                placeholder="John Ray"
                label="Name"
                type="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="John@gmail.com"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="h-[40px] mt-2">
                <Button label="Create" type="submit" />
              </div>
              <div className="h-[40px] mt-2 w-full">
                <Button onClick={props.onClick} label="Cancel" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
