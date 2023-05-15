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
    user_id:id,
    rate: "",
    month: "",
    working_days: "",
    total_hours_overtime: "",
  });

  const handlePayroll = async (e) => {
    e.preventDefault();
    await axios
      .post(`/payroll/`, values, { headers })
      .then((res) => {
        navigate("/AdminDashboard/Employee");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-screen mx-10 my-8 drop-shadow-2xl shadow-2xl bg-gradient-to-r from-sky-500 to-indigo-500">
      <h1 className="font-extrabold text-2xl mx-4 my-4">Payroll</h1>
      <div className="flex justify-center items-center">
        <div className="mx-10 w-96 border border-dotted rounded-lg bg-gray-400">
          <div className="flex flex-col w-96">
            <form onSubmit={handlePayroll}>
              <div className="border-none outline-none ">
                <Input
                  type="number"
                  name="Rate"
                  label="Rate"
                  onChange={(e) =>
                    setValues({ ...values, rate: e.target.value })
                  }
                />
              </div>
              <div className="border-none outline-none">
                <Input
                  label="Month"
                  type="month"
                  onChange={(e) =>
                    setValues({ ...values, month: e.target.value })
                  }
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
              <div className="mt-10 text-xl hover:bg-red-900 rounded-3xl mb-2">
                <Button type="submit" label="Generate Payroll" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
