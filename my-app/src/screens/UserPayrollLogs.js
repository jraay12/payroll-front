import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import {  useParams } from "react-router-dom";
import Loader from "../components/Loader";

const UserPayrollLogs = () => {
  let access_token = sessionStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { id } = useParams();

  const { data: Payroll, isLoading } = useQuery(
    ["rate"],
    async () => {
      const response = await axios.get(`/payroll/${id}`, { headers });
      const value = response?.data;
      return value;
    },
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true,
    }
  );

  if (!Array.isArray(Payroll) || Payroll.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center item-center w-full h-screen">
      <div className="flex flex-col backdrop-blur-sm rounded-xl min-h-[50%] border-black drop-shadow-2xl shadow-2xl w-full mx-10 my-10 border-2 border-dashed shadow-black">
        <div className="flex">
          <div className="flex justify-start">
            <h1 className="font-bold text-4xl ml-4 mt-2">LOGS</h1>
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
            <table className="w-[90%] m-10 text-justify text-sm font-bold">
              <thead>
                <tr className="font-bold text-lg border-2 border-black ">
                  <th>Month</th>
                  <th>Working Days</th>
                  <th>Overtime Hours</th>
                </tr>
              </thead>
              <tbody className="text-justify">
                {Array.isArray(Payroll) &&
                  Payroll?.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-600 hover:ease-in cursor-pointer transition ease-in duration-75 font-semibold"
                    >
                      <td className="font-semibold text-sm">{item.month}</td>
                      <td className="text-sm font-bold pl-2">
                        {item.working_days}
                      </td>
                      <td className="font-semibold text-sm">
                        {item.total_hours_overtime}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPayrollLogs;
