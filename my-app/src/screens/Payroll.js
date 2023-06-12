import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
const Payroll = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  let access_token = sessionStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const [values, setValues] = useState({
    user_id: id,
    month: "",
    working_days: "",
    cash_advance: "",
    total_hours_overtime: "",
  });

  const handlePayroll = async (e) => {
    e.preventDefault();
    await axios
      .post(`/payroll/`, values, {headers})
      .then((res) => {
        console.log(res)
        navigate("/AdminDashboard/Employee");
      })
      .catch((err) => console.error(err));
  };
  
    return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className="backdrop-blur-sm border-2 border-dashed rounded-3xl border-black min-h-[60%] w-96 mx-10">
        <form onSubmit={handlePayroll}>
          <div className="border-none outline-none">
            <Input
              label="Month"
              type="month"
              onChange={(e) => setValues({ ...values, month: e.target.value })}
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Cash Advance"
              type="number"
              onChange={(e) => setValues({ ...values, cash_advance: e.target.value })}
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Working Days"
              type="number"
              onChange={(e) =>
                setValues({ ...values, working_days: e.target.value })
              }
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Total hours Overtime"
              type="number"
              onChange={(e) =>
                setValues({
                  ...values,
                  total_hours_overtime: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-10 text-xl hover:opacity-60 bg-green-500 mx-10 rounded-lg mb-2">
            <Button type="submit" label="Generate Payroll" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payroll;
