import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import DropDownInputMonth from "../components/DropDownInputMonth";
import axios from "../api/axios";
const Payroll = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("")
  const [workingDays, setWorkingDays] = useState("")
  const [cashAdvance, setCashAdvance] = useState("")
  const [totalHoursOvertime, setTotalHoursOvertime] = useState("")

  const { id } = useParams();
  

  let access_token = sessionStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
    
  const handlePayroll = async (e) => {
    
    e.preventDefault();
    const formData = new FormData()
    formData.append("user_id", id)
    formData.append("month", month)
    formData.append("working_days", workingDays)
    formData.append("cash_advance", cashAdvance)
    formData.append("total_hours_overtime", totalHoursOvertime)

    await axios
      .post(`/payroll/`, formData, {headers})
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
            <DropDownInputMonth 
            setMonth={setMonth}
            month={month}
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Cash Advance"
              value={cashAdvance}
              type="number"
              onChange={(e) => setCashAdvance(e.target.value)}
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Working Days"
              type="number"
              value={workingDays}
              onChange={(e) =>
                setWorkingDays(e.target.value)
              }
            />
          </div>
          <div className="border-none outline-none">
            <Input
              label="Total hours Overtime"
              type="number"
              value={totalHoursOvertime}
              onChange={(e) =>
                setTotalHoursOvertime(e.target.value)
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
