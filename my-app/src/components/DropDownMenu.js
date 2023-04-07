import React, { useState } from "react";
import Button from "./Button";
import { VscChevronDown } from "react-icons/vsc";
const DropDownMenu = () => {
  const [isClick, setisClick] = useState(false);
  return (
    <button className="flex items-center itepx-4 py-2 text-white text-[14px]">
      <span>Profile</span>
      <VscChevronDown className="mr-2" />
    </button>
  );
};

export default DropDownMenu;
