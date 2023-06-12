import React from "react";

function DropDownPayrollHistory({ historyMonth, setHistoryMonth}) {

  const handleOptionChange = (event) => {
    setHistoryMonth(event.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <label className="font-bold  text-lg ml-[20px]">Month</label>
      <div
        htmlFor="options"
        className="mx-5 rounded-lg h-[40px] flex items-center "
      >
        <select
          id="options"
          value={historyMonth}
          onChange={handleOptionChange}
          className="w-full h-full rounded-2xl"
        >
          <option value=""></option>
          <option value="All">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>


        </select>
      </div>
    </div>
  );
}

export default DropDownPayrollHistory;
