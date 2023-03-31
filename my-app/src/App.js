import logo from "./logo.svg";
import "./App.css";
import Login from "./screens/Login";
import Dashboard from "./screens/dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}/>
    </Routes>
  );
}

export default App;
