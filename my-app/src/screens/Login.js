import { useState } from "react";
import Logo from "../images/logo.png";
import "../index.css";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-[50%] bg-sky-400 min-w-screen flex justify-center">
        <div className="flex flex-col items-center h-full w-screen gap-10">
          <div className="w-[200px] h-[200px] object-contain mt-10 flex items-center">
            <img src={Logo} alt="" className="bg-logo"></img>
          </div>
          <div className="flex h-screen items-center">
            <div className="h-[360px] max-w-[400px] w-screen bg-white rounded-md shadow-2xl ">
              <div className="flex flex-col items-center gap-8">
                <h1 className="font-semibold mt-[20px] text-2xl">Sign In</h1>
                <p className="text-gray-400 text-sm">
                  Sign in with your username and password
                </p>
              </div>
              <form onSubmit={handleSubmit} method="POST">
                <div className="div flex flex-col gap-6 mt-[20px]">
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Email"
                  />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <div className="h-[40px]">
                  <Button type="submit" label="Login" onClick={handleSubmit} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
