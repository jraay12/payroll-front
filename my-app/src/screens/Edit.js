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
    id: id,
    name: "",
    password: "",
    position: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`/searchUser/` + id, { headers })
      .then((res) => {
        setValues({
          ...values,
          name: res.data.name,
          email: res.data.email,
          position: res.data.position,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/update/${id}`, values, { headers })
      .then((res) => {
        navigate("/AdminDashboard/Employee");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex justify-center items-center flex-col w-screen mx-10 my-4 max-h-[550px] max-w-7xl  bg-gradient-to-r from-sky-500 to-indigo-500 drop-shadow-2xl shadow-2xl rounded-xl">
      <label className="font-bold ml-4 text-xl">Update User</label>
      <div className="w-full mx-4 flex flex-col mt-7">
        <div className="flex justify-center items-center flex-col">
          <form onSubmit={handleUpdate}>
            <Input
              label="Name"
              type="name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />

            <Input
              label="Email"
              value={values.email}
              type="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              disabled={true}
            />
            <Input
              label="Position"
              value={values.position}
              type="email"
              disabled={true}
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