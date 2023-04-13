import React from "react";
import Button from "../components/Button";
import { useState } from "react";
import Modal from "../components/Modal";
const AddUser = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="h-[40px] w-[170px] px-2">
        <Button
          label="Create account"
          onClick={() => {
            setOpenModal(true);
          }}
        />
        <div className="flex items-center absolute ">
          {openModal && <Modal onClick={() => setOpenModal(false)} />}
  

        </div>
      </div>
    </div>
  );
};

export default AddUser;
