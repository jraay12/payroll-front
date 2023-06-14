import React, { useState } from "react";
import axios from "../api/axios";
import SalaryLogs from "./SalaryLogs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import DropDownPayrollHistory from "../components/DropDownPayrollHistory";

const PayrollLog = () => {
  let access_token = sessionStorage.getItem("access_token");
  const [openModal, setOpenModal] = useState(() => {
    return false;
  });
  const [historyMonth, setHistoryMonth] = useState("");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { data: Payroll, isLoading } = useQuery(
    ["rate"],
    async () => {
      const response = await axios.get(`/payroll/`, { headers });
      const value = response.data;
      return value;
    },
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true,
    }
  );

  if(!Array.isArray(Payroll) || Payroll.length === 0){
    return null
  }
  return (
    <div className="flex justify-center item-center w-full h-screen">
      <div className="flex flex-col backdrop-blur-sm rounded-xl shadow-black min-h-[50%] drop-shadow-2xl shadow-2xl w-full mx-10 my-10 border-2 border-dashed border-black">
        <div className="flex">
          <div className="flex justify-start">
            <h1 className="font-bold text-4xl ml-4 mt-2">LOGS</h1>
          </div>
          <div className="flex w-full justify-end">
            <DropDownPayrollHistory
              setHistoryMonth={setHistoryMonth}
              historyMonth={historyMonth}
            />
          </div>
        </div>
        <div
          className={`${
            isLoading && "flex justify-center items-center"
          } py-2 overscroll-scroll overflow-x-hidden max-h-[450px] px-10`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <table className="min-w-full text-left text-sm font-bold">
                <thead>
                  <tr className="font-bold text-lg border-2 border-black">
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Month</th>
                    <th>Working Days</th>
                    <th>Overtime Hours</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(Payroll) &&
                    Payroll.filter(
                      (item) => item.payroll.month === historyMonth || historyMonth === "" 
                    ).map((item) => (
                      <tr
                        key={item.payroll.id}
                        className="hover:bg-gray-600 hover:ease-in cursor-pointer transition ease-in duration-75 font-semibold"
                      >
                        <td className="font-semibold">{item.user}</td>
                        <td className="font-semibold text-sm">{item.rate}</td>
                        <td className="font-semibold text-sm">
                          {item.payroll.month}
                        </td>
                        <td className="text-sm font-bold pl-2">
                          {item.payroll.working_days}
                        </td>
                        <td className="font-semibold text-sm">
                          {item.payroll.total_hours_overtime}
                        </td>
                        <td className="text-sm font-sbold pl-2 hover:text-red-500">
                          <Link
                            to={`/AdminDashboard/SalaryLogs/${item?.payroll?.user_id}/${item?.payroll?.month}/${item?.payroll?.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                {openModal && (
                  <SalaryLogs onClick={() => setOpenModal(false)} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollLog;
