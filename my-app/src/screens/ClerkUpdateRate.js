import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const ClerkUpdateRate = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [values, setValues] = useState({
    rate: "",
  });
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const handleUpdateRate = (e) => {
    e.preventDefault();
    axios
      .put(`/users/rate/` + id, values, { headers })
      .then((res) => {
        navigate("/ClerkDashboard/Employee");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`/payroll`, { headers })
      .then((res) => {
        const response = res.data;
        const filterData = response?.filter(
          (item) => item.payroll.user_id == id
        );
        setValues({ ...values, rate: filterData[0].rate });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex justify-center w-full items-center h-screen">
      <div className="backdrop-blur-sm h-72 w-72 flex flex-col border-black shadow-2xl drop-shadow-2xl shadow-black gap-8 items-center border-2 border-dashed rounded-2xl">
        <h1 className="font-bold text-lg mt-4">Update Rate</h1>
        <div className="flex flex-col">
          <form onSubmit={handleUpdateRate}>
            <Input
              label="Rate"
              onChange={(e) => setValues({ ...values, rate: e.target.value })}
              value={values.rate}
            />
            <div className="h-10 bg-green-400 mt-10 mx-3 rounded-lg">
              <Button label="Submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClerkUpdateRate;
