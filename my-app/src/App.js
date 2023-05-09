import "./App.css";
import Login from "./screens/Login";
import Dashboard from "./screens/Admindashboard";
import AddUser from "./screens/AddUser";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./screens/UserDashboard";
import UpdateUser from "./screens/UpdateUser";
import PartialDashboard from "./screens/PartialDashboard";
import Employee from "./screens/Employee";
import Payroll from "./screens/Payroll";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
      <Route path="/Admindashboard" element={<Dashboard />} />
      <Route path="/Create" element={<AddUser />} />
      <Route path="/Update" element={<UpdateUser />} />
      <Route path="/PartialDashboard" element={<PartialDashboard />}>
        <Route path="Employee" element={<Employee />} />
        <Route path="Payroll" element={<Payroll />} />
      </Route>
    </Routes>
  );
}

export default App;
