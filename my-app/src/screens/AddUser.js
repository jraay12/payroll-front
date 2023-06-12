import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import DropDownInput from "../components/DropdownInput"
import DropDownInputCountry from "../components/DropDownInputCountry"

const AddUser = () => {
  const navigate = useNavigate()
  
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [contactNumber, setcontactNumber] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [state, setState] = useState("")
  const [rate, setRate] = useState("")
  const [photo, setPhotos] = useState("")

  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "multipart/form-data",

  };
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    formData.append("password", password)
    formData.append("email", email)
    formData.append("contact_number", contactNumber)
    formData.append("rate", rate)
    formData.append("position", position)
    formData.append("country", country)
    formData.append("state", state)
    formData.append("zip_code", zipCode)
    formData.append("city", city)
    formData.append("street", street)
    formData.append("photo", photo)
    
    
    axios
      .post('/register', formData, {headers})
      .then(res => {
        navigate("/AdminDashboard/Employee")
       
      })
      .catch((err) => console.error(err));
      
  };
  return (
    <div className="flex w-full h-full justify-center items-center ">
      <div className="flex flex-col backdrop-blur-sm rounded-xl min-h-[50%] drop-shadow-2xl shadow-2xl w-full mx-10 my-12 border-2 border-dashed">
        <h1 className="font-bold mt-[10px] ml-[10px] text-white">
          Register Employee
        </h1>
        <form onSubmit={(e) => handleRegister(e)} encType='multipart/form-data'>
          <div className="flex flex-col gap-2 flex-wrap">
            <div className="flex mt-5">
              <div className="w-[40%]">
                <Input placeholder="Name" label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <Input placeholder="Email" label="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="w-[10%]">
                <Input placeholder="Photo" label="Photo" id="photo"  type="file" onChange={(e) => setPhotos(e.target.files[0])}/>
              </div>
            </div>
            <div className="flex">
              <div className="w-[40%]">
                <Input placeholder="Password" label="Password" id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="w-[30%] ">
                <Input label="Contact Number" placeholder="Contact Number" id="contact_number" value={contactNumber} onChange={(e) => setcontactNumber(e.target.value)}/>
              </div>
              <div className="w-[20%]">
              <DropDownInput 
              setPosition = {setPosition}
              position={position}
              />
              </div>
              <div className="w-[10%]">
              <Input label="Rate" placeholder="Rate" id="rate" value={rate} onChange={(e) => setRate(e.target.value)}/>

              </div>
            </div>
            <h1 className="font-bold mt-[10px] ml-[10px] text-white">
              Address Information
            </h1>
            <div className="flex">
              <div className="w-[25%]">
                <Input label="Street" placeholder="12-28 St."  id="street" value={street} onChange={(e) => setStreet(e.target.value)}/>
              </div>
              <div className="w-[50%]">
                <Input label="City" placeholder="Davao City" value={city} id="city" onChange={(e) => setCity(e.target.value)}/>
              </div>

              <div className="w-[25%]">
                <Input label="Zip Code" placeholder="9000" value={zipCode} id="zip_code" onChange={(e) => setZipCode(e.target.value)}/>
              </div>
            </div>
            <div className="flex">
              <div className="w-[50%]">
                <Input label="State" placeholder="Misamis Oriental" value={state}  id="state" onChange={(e) => setState(e.target.value)}/>
              </div>
              <div className="w-[50%]">
                <DropDownInputCountry 
                setCountry = {setCountry}
                country={country}
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-500 w-[100px] rounded-md my-3 ml-10">
            <Button label="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
