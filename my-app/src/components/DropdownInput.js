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
          <option value=""></option>
          <option value="Front End">Front End</option>
          <option value="Back End">Back End</option>
          <option value="Dev Ops">Dev Ops</option>
          <option value="QA Tester">QA Tester</option>
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
