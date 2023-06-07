import React from "react";
import Button from "../components/Button";
import { useState } from "react";
import AddUser from "../screens/AddUser";
const Modal = () => {
  const [openModal, setOpenModal] = useState(() => {
    return false;
  });

  return (
    <div className="flex justify-start">
      <div className="h-[40px] w-[170px]  border-none bg-red-600 rounded-lg mx-4 hover:bg-blue-600">
        <Button
          label="Create account"
          onClick={() => {
            setOpenModal(true);          }}
        />

        {openModal && <AddUser onClick={() => setOpenModal(false)} />}
      </div>
    </div>
  );
};

export default Modal;