import "./App.css";
import Login from "./screens/Login";
import AddUser from "./screens/AddUser";
import { Routes, Route } from "react-router-dom";
import PartialDashboard from "./screens/PartialDashboard";
import Employee from "./screens/Employee";
import Edit from "./screens/Edit";
import Payroll from "./screens/Payroll";
import PayrollLog from "./screens/PayrollLog";
import SalaryLogs from "./screens/SalaryLogs";
import UpdateRate from "./screens/UpdateRate";
import User from "./screens/User";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {

  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Create" element={<AddUser />} />
      <Route path="/AdminDashboard" element={<PartialDashboard />}>
        <Route path="Employee" element={<Employee />} />
        <Route path="Payroll/:id" element={<Payroll />} />
        <Route path="Register" element={<AddUser />} />
        <Route path="PayrollLog" element={<PayrollLog />} />
        <Route path="Edit/:id" element={<Edit />} />
        <Route path="UpdateRate/:id" element={<UpdateRate />} />
        <Route path="SalaryLogs/:id" element={<SalaryLogs />} />
      </Route>
      <Route path="/UserDashboard" element={<User />} />
    </Routes>
    </QueryClientProvider>
  );
}

export default App;
