import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import PdfFile from "../components/PdfFIle";

const SalaryLogs = () => {
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { userId, month, id } = useParams();

  const { data: Salary } = useQuery(
    ["salary"],
    async () => {
      const response = await axios.get(`/salary`, { headers });
      const value = Object.values(response.data);
      const filterSalary = value[1].filter((item) => item.salary_id == id);
      return filterSalary;
    },
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  );

  const { data: Payroll, isLoading } = useQuery(
    ["pay"],
    async () => {
      const response = await axios.get(`/salary`, { headers });
      const value = Object.values(response.data);
      const filterPayroll = value[0].filter((item) => item.payroll_id == id);
      return filterPayroll;
    },
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      keepPreviousData: true,

    }
  );

  const { data: getUser } = useQuery(
    ["name"],
    async () => {
      const response = await axios.get(`/getUser`, { headers });
      const value = Object.values(response.data.data);
      const filterData = value.filter((item) => item.id == userId);
      return filterData;
    },
    {
      refetchInterval: 2000,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
    }
  );

  const { data: Payrolls } = useQuery(
    ["payroll"],
    async () => {
      const response = await axios.get(`/payroll/` + userId, { headers });
      const value = response?.data?.filter((item) => item?.month == month);
      return value;
    },
    {
      refetchInterval: 2000,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      
    }
  );

  if (
    !Array.isArray(Salary) ||
    Salary.length === 0 ||
    !getUser ||
    getUser.length === 0 ||
    !Payrolls ||
    Payrolls.length === 0 ||
    !Payroll ||
    Payroll.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex w-full min-h-screen max-h-screen justify-center items-center">
      <div className="flex flex-col w-[80%] max-h-[80%]">
        {isLoading ? (
          <h1 className="text-3xl font-extrabold mt-[15%]">
            No Existing Salary
          </h1>
        ) : (
          <div className="container  mx-auto overflow-auto p-4 rounded-3xl shadow-2xl drop-shadow-2xl shadow-black bg-white">
            <div className="border border-gray-400 p-4">
              <h1 className="text-xl font-bold mb-4">CODEWAVE</h1>
              <h2 className="text-lg font-bold mb-2">Payslip</h2>
              <div className="border-b border-gray-400 pb-4 mb-4">
                <p className="mb-1">Employee Name: {getUser[0].name}</p>
                <p className="mb-1">Employee ID:{getUser[0].id} </p>
                <p className="mb-1">Position: {getUser[0].position}</p>
              </div>
              <div className="flex justify-between border-b border-gray-400 py-2 mb-2">
                <p className="w-1/2 font-bold">Payrolls</p>
                <p className="w-1/4 text-right font-bold">Amount (P)</p>
              </div>
              {/* <div className="flex justify-between mb-2">
                <p className="w-1/2">Rate</p>
                <p className="w-1/4 text-right">{data[0].rate}</p>
              </div> */}
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Total Hours Overtime</p>
                <p className="w-1/4 text-right">
                  {Payrolls[0].total_hours_overtime}
                </p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="w-1/2">Working Days</p>
                <p className="w-1/4 text-right">{Payrolls[0].working_days}</p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-2">
                <p className="w-1/2">Gross Pay:</p>
                <p className="w-1/4 text-right">
                  {Payroll[0].gross_salary.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-4 mb-2">
                <p className="w-1/2 font-bold">Deductions</p>
                <p className="w-1/4 text-right font-bold">Amount (P) </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Tax</p>
                <p className="w-1/4 text-right">
                  {Salary[0].tax.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Pag-Ibig</p>
                <p className="w-1/4 text-right">
                  {Salary[0].pagibig.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">PhilHealth</p>
                <p className="w-1/4 text-right">
                  {Salary[0].philhealth.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Cash Advance</p>
                <p className="w-1/4 text-right">
                  {Salary[0].cash_advance.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">SSS</p>
                <p className="w-1/4 text-right">
                  {Salary[0].sss.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-2">
                <p className="w-1/2">Total Deductions:</p>
                <p className="w-1/4 text-right">
                  {Salary[0].total_deduction.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="w-1/2">Net Pay:</p>
                <p className="w-1/2 text-right">
                  {Payroll[0].net_salary.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-gray-400 pt-4 mt-4 flex">
                <p className="text-sm italic">
                  Payment Date: {Payrolls[0].month}
                </p>
                <div className=" w-full rounded-3xl flex justify-end gap-2">
                  <div className="bg-blue-600 w-20 h-10 rounded-lg">
                    <Button
                      label="Close"
                      onClick={() => navigate("/AdminDashboard/PayrollLog")}
                    />
                  </div>
                  <PDFDownloadLink
                    document={
                      <PdfFile
                        salary={Salary}
                        payroll={Payroll}
                        userDetails={getUser}
                        userPayroll={Payrolls}
                      />
                    }
                    fileName="Payslip"
                  >
                    {({ loading }) =>
                      loading ? (
                        <div className="w-20 h-10 bg-red-600 rounder-lg">
                          <Button label="Loading.." />
                        </div>
                      ) : (
                        <div className="w-20 h-10 rounded-lg bg-red-600 hover:opacity-80">
                          <Button label="Download" />
                        </div>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryLogs;
