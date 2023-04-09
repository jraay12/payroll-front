
import "./App.css";
import Login from "./screens/Login";
import Dashboard from "./screens/Admindashboard";
import AddUser from "./screens/AddUser";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./screens/UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Admindashboard" element={<Dashboard />}/>
      <Route path="/Create" element={<AddUser />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
