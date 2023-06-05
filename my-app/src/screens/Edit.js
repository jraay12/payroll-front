import React, { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const Edit = () => {
  const navigate = useNavigate();
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    password: "",
    position: "",
    contact_number: "",
  });

 

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/users/` + id, values, { headers })
      .then((res) => {
        navigate("/AdminDashboard/Employee");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios.get(`/getUser`, {headers}).then(res => {
      const value = Object.values(res.data.data)
      const filterData = value.filter((item) => item.id == id)
      setValues({...values, name: filterData[0].name, position: filterData[0].position})
    }).catch(err => console.error(err))

  }, [])

  
  return (
    <div className="flex justify-center items-center flex-col w-screen mx-10 my-4 max-h-[550px] max-w-7xl backdrop-blur-sm  drop-shadow-2xl shadow-2xl rounded-xl">
      <label className="font-bold ml-4 text-xl">Update User</label>
      <div className="w-full mx-4 flex flex-col mt-7">
        <div className="flex justify-center items-center flex-col">
          <form onSubmit={handleUpdate}>
            <Input
              label="Name"
              type="name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />

            <Input
              label="Contact Number"
              type="number"
              onChange={(e) => setValues({ ...values, contact_number: e.target.value })}
            />
            <Input
              label="Position"
              type="text"
              onChange={(e) =>
                setValues({ ...values, position: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <div className="h-[40px] mt-4 bg-blue-600 rounded-lg outline-none hover:bg-yellow-500 hover:text-black" >
              <Button label="Update" type="submit" />
            </div>
            <div className="h-[40px] mt-2 bg-blue-600 rounded-lg outline-none hover:bg-red-900">
              <Button label="Cancel" onClick={() => navigate("/AdminDashboard/Employee")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
