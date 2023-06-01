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
        console.log(value);
      })
      .catch((err) => console.error(err));
  };

  const practice = () => {
    console.log("Success")
  }

  return (
    <div className="flex justify-center item-center w-screen h-screen ">
      <div className="flex flex-col backdrop-blur-sm rounded-xl min-h-[50%] drop-shadow-2xl shadow-2xl w-full mx-10 my-10 border-2 border-dashed ">
        <h1 className="font-bold text-xl ml-4 mt-2">LOGS</h1>
        <div className="py-2 overscroll-scroll overflow-x-hidden max-h-[450px] px-10">
          <table className="min-w-full text-left text-sm font-light">
            <thead>
              <tr className="font-bold text-left">
                <th>Name</th>
                <th>Rate</th>
                <th>Month</th>
                <th>Working Days</th>
                <th>Overtime Hours</th>
              </tr>
            </thead>
            <tbody onClick={practice}>
              {Array.isArray(value) &&
                value.map((item) => (
                  <tr
                    key={item.payroll.id}
                    className="hover:bg-gray-600hover:ease-in cursor-pointer transition ease-in duration-75 font-semibold"
                  >
                    <td className="whitespace-nowrap    pl-2 border-2">
                      {item.user}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                      {item.rate}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                      {item.payroll.month}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                      {item.payroll.working_days}
                    </td>
                    <td className="whitespace-nowrap  text-sm font-semibold  pl-2 border-2">
                      {item.payroll.total_hours_overtime}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollLog;
