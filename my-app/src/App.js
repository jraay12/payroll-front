import "./App.css";
import Login from "./screens/Login";
import AddUser from "./screens/AddUser";
import { Routes, Route, Router } from "react-router-dom";
import PartialDashboard from "./screens/PartialDashboard";
import Employee from "./screens/Employee";
import ClerkEmployee from "../src/screens/ClerkEmployee"
import Edit from "./screens/Edit";
import Payroll from "./screens/Payroll";
import PayrollLog from "./screens/PayrollLog";
import SalaryLogs from "./screens/SalaryLogs";
import UpdateRate from "./screens/UpdateRate";
import User from "./screens/User";
import UserDasbroad from "./screens/UserDashboard";
import ClerkDashboard from "./screens/ClerkDashboard";
import ClerkSalaryLogs from "./screens/ClerkSalaryLogs";
import ClerkUpdateRate from "./screens/ClerkUpdateRate";
import ClerkPayroll from "./screens/ClerkPayroll";
import ClerkPayrollLog from "./screens/ClerkPayrollLog";
import UserProfile from "./screens/UserProfile";
import UserPayrollLogs from "./screens/UserPayrollLogs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/AdminDashboard" element={<PartialDashboard />}>
          <Route path="Employee" element={<Employee />} />
          <Route path="Payroll/:id" element={<Payroll />} />
          <Route path="Register" element={<AddUser />} />
          <Route path="PayrollLog" element={<PayrollLog />} />
          <Route path="Edit/:id" element={<Edit />} />
          <Route path="UpdateRate/:id" element={<UpdateRate />} />
          <Route path="SalaryLogs/:userId/:month/:id" element={<SalaryLogs />} />
        </Route>
        <Route path="/ClerkDashboard" element={<ClerkDashboard />}>
          <Route path="Employee" element={<ClerkEmployee />} />
          <Route path="Payroll/:id" element={<ClerkPayroll />} />
          <Route path="PayrollLog" element={<ClerkPayrollLog />} />
          <Route path="UpdateRate/:id" element={<ClerkUpdateRate />} />
          <Route path="SalaryLogs/:userId/:month/:id" element={<ClerkSalaryLogs />} />
        </Route>
        <Route path="/UserDashboard" element={<UserDasbroad />}>
          <Route path="User/:id" element={<User />} />
          <Route path="Profile/:id" element={<UserProfile />} />
          <Route path="UserPayrollLogs/:id" element={<UserPayrollLogs />} />

        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
