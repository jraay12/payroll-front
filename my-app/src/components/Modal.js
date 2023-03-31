import React from "react";
import Input from "./Input";
import Button from "./Button";
const Modal = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center h-[600px] w-[400px] bg-blue-400 drop-shadow-2xl shadow-2xl gap-10 rounded-2xl">
        <label className="font-bold mt-4 text-2xl">Add User</label>
        <div className="w-full mx-4 flex flex-col gap-4">
          <Input placeholder="John Ray" label="Name" type ='name' />
          <Input placeholder="John@gmail.com" label="Email" type='email'/>
          <Input label="Password" type='password'/>
          <Input label="Confirm Password" type='password'/>
          <div className="h-[40px] mt-2">
            <Button label="Create" />
          </div>
          <div className="h-[40px] mt-2 w-full">
            <Button onClick= {props.onClick} label ='Cancel'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
