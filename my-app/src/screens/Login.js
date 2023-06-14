import { useEffect, useRef, useState } from "react";
import Logo from "../images/logo.png";
import "../index.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);


  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Email", { autoClose: 1000, theme: "dark" });
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password", {
        autoClose: 1000,
        theme: "dark",
      });
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      axios
        .post(`/login`, formData)
        .then((res) => {
          const data = res.data;
          const token = data.data.token;
          console.log(data)
          sessionStorage.setItem("access_token", token);
          const userId = data.data.user.id

          if (data.data.user.role_id == 1) {
            navigate("/AdminDashboard/Employee");
          } else if (data.data.user.role_id == 3){
            navigate(`/ClerkDashboard/Employee`)
          }else{
            navigate(`/UserDashboard/User/${userId}`)
          }
        })
        .catch((err) => {
          console.error(err);
          setAttempt(attempt + 1);
          toast.error("Please enter valid credentials", {
            autoClose: 1000,
            theme: "dark",
          });

          if (attempt >= 3) {
            const disableButtonTime = 30000; 
            setButtonDisabled(true);
            setRemainingTime(disableButtonTime);

            const timer = setInterval(() => {
              setRemainingTime((prevTime) => prevTime - 1000);
            }, 1000);

            setTimeout(() => {
              clearInterval(timer);
              setButtonDisabled(false);
              setAttempt(1);
              setRemainingTime(0);
            }, disableButtonTime);
          }
        });
    }
  };

  const formatTime = (time) => {
    const seconds = Math.ceil(time / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center bg-cover">
      <div className="flex flex-col items-center h-full w-screen justify-center">
        <div className="w-[100px] h-[100px] object-contain mt-2 flex items-center">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="h-[360px] max-w-[350px] w-screen bg-blue-950 rounded-md shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <h1 className="font-semibold mt-[20px] text-2xl text-white">
              Sign In
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in with your username and password
            </p>
          </div>
          <form onSubmit={handleSubmit} method="POST">
            <div className="div flex flex-col gap-6 mx-4 mt-[20px] ">
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
              <div className={`h-[40px] bg-blue-500 mx-2  rounded-full ${buttonDisabled && 'bg-blue-300'} `}>
                <Button
                  type="submit"
                  label={buttonDisabled ? formatTime(remainingTime) : "Submit"}
                  disabled={buttonDisabled}
                />
                <ToastContainer />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
