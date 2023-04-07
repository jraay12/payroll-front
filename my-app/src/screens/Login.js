import { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import "../index.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() =>{
    sessionStorage.clear();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: formData,
      
    });

    const data = await response.json();
    if (response.ok) {
      const token = data.data.token;
      sessionStorage.setItem("access_token", token);
      navigate("/Admindashboard");
      
    } else { 
      toast.error("Please enter Valid Credentials", {autoClose:1000, theme:"dark"})
    }
    }
  };  

  const validate = () => {
    let result = true;
    if(email === '' || email === null) {
      result=false;
      toast.warning('Please Enter Email', {autoClose: 1000, theme:'dark'});
    }
    if(password === '' || password === null) {
      result=false;
      toast.warning('Please Enter Password', {autoClose: 1000, theme:'dark'});
    }
    return result
    
  }


  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center h-full w-screen">
          <div className="w-[100px] h-[100px] object-contain mt-2 flex items-center">
            <img src={Logo} alt="Logo"></img>
          </div>
          <div className="h-[360px] max-w-[350px] w-screen bg-blue-950 rounded-md shadow-2xl ">
              <div className="flex flex-col items-center gap-8">
                <h1 className="font-semibold mt-[20px] text-2xl text-white">Sign In</h1>
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
                  <ToastContainer></ToastContainer>
                  </div>
                </div>
              </form>
            </div>
          
        </div>
      
    </div>
  );
}

export default Login;
