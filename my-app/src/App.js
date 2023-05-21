import "./App.css";
import Login from "./screens/Login";
import AddUser from "./screens/AddUser";
import { Routes, Route } from "react-router-dom";
import PartialDashboard from "./screens/PartialDashboard";
import Employee from "./screens/Employee";
import Edit from "./screens/Edit";
import Payroll from "./screens/Payroll";
import PayrollLog from "./screens/PayrollLog";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Create" element={<AddUser />} />
      <Route path="/AdminDashboard" element={<PartialDashboard />}>
        <Route path="Employee" element={<Employee />} />
        <Route path="Payroll/:id" element={<Payroll />} />
        <Route path="Register" element={<AddUser />} />
        <Route path="PayrollLog" element={<PayrollLog />} />
        <Route path="Edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
