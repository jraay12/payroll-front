import React from "react";

function Dropdown({ position, setPosition}) {
  const handleOptionChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-bold  text-lg ml-[20px]">Position</label>
      <div
        htmlFor="options"
        className="mx-5 rounded-lg h-[40px] flex items-center "
      >
        <select
          id="options"
          value={position}
          onChange={handleOptionChange}
          className="w-full h-full rounded-2xl"
        >
          <option value=""></option>
          <option value="Clerk">Clerk</option>
          <option value="Back End">Back End</option>
          <option value="Dev Ops">Dev Ops</option>
          <option value="QA Tester">QA Tester</option>
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
