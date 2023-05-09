import React, { useState } from "react";

function Dropdown({ position, setPosition }) {
  const handleOptionChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-bold  text-lg ml-[20px]">Position</label>
      <div
        htmlFor="options"
        className="mx-5 rounded-lg h-[40px] flex items-center border-4 border-gray-700"
      >
        <select
          id="options"
          value={position}
          onChange={handleOptionChange}
          className="w-full h-full"
        >
          <option value="Normal Specialist">Normal Specialist</option>
          <option value="Silent Doctors">Silent Doctors</option>
          <option value="Nursing">Nursing</option>
          <option value="Physician Assistant">Physician Assistant</option>
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
