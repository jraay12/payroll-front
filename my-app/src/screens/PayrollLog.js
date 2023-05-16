import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const PayrollLog = () => {
  let access_token = sessionStorage.getItem("access_token");
  const [value, setValue] = useState(() => {
    return [];
  });
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(() => {
      fetchPayroll();
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  const fetchPayroll = () => {
    axios
      .get(`/payroll/`, { headers })
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center item-center w-screen h-screen ">
      <div className="bg-white  w-full h-[80%] mx-10 my-10 rounded-xl ">
        <h1 className="font-bold text-xl ml-4 mt-2">LOGS</h1>

        <div className="px-9 py-2 overflow-scroll overflow-x-hidden overscroll-y-none max-h-[450px] mx-10">
          <div className="inline-block min-w-full py-2 ">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="-b font-medium dark:-neutral-500 max-w-full ">
                <tr className="text-2xl font-bold ">
                  <th>User ID</th>
                  <th>Rate</th>
                  <th>Month</th>
                  <th>Working Days</th>
                  <th>Total hours</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(value) &&
                  value.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-600 hover:ease-in cursor-pointer transition ease-in duration-75"
                    >
                      <td className="whitespace-nowrap  font-medium  pl-2 border-2">
                        {item.user_id}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                        {item.rate}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                        {item.month}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                        {item.working_days}
                      </td>
                      <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                        {item.total_hours_overtime}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollLog;
