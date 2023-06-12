import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Loader from "../components/Loader";
import PdfFile from "../components/PdfFIle";

const User = () => {
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let access_token = sessionStorage.getItem("access_token");
    if (access_token === "" || access_token === null) {
      navigate("/");
    }
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["id"],
    async () => {
      const response = await axios.get(`/salary/` + id, { headers });
      const value = Object.values(response?.data);
      return value;
    },
    {
      refetchInterval: 100,
      staleTime: 500,
      cacheTime: 100,
      refetchIntervalInBackground: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  const { data: getUser } = useQuery(["name"], async () => {
    const response = await axios.get(`/getUser`, { headers });
    const value = Object.values(response?.data);
    const filterData = value?.filter((item) => item.id == id);
    return filterData;
  });

  const { data: Payrolls } = useQuery(["payroll"], async () => {
    const response = await axios.get(`/payroll/` + id, { headers });
    return response?.data;
  });

  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    !getUser ||
    getUser.length === 0 ||
    !Payrolls ||
    Payrolls.length === 0
  ) {
    return null;
  }
  
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex flex-col w-[80%] max-h-[80%]">
        {isLoading ? <Loader /> : (
          <div className="container  mx-auto overflow-auto p-4 rounded-3xl bg-white">
            <div className="border border-gray-400 p-4">
              <h1 className="text-xl font-bold mb-4">CODEWAVE</h1>
              <h2 className="text-lg font-bold mb-2">Payslip</h2>
              <div className="border-b border-gray-400 pb-4 mb-4">
                <p className="mb-1">Employee Name: {getUser[0].name}</p>
                <p className="mb-1">Employee ID:{getUser[0].id} </p>
                <p className="mb-1">Position: {getUser[0].position}</p>
              </div>
              <div className="flex justify-between border-b border-gray-400 py-2 mb-2">
                <p className="w-1/2 font-bold">Earnings</p>
                <p className="w-1/4 text-right font-bold">Amount (P)</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Rate</p>
                <p className="w-1/4 text-right">{data[0].rate}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Total Hours Overtime</p>
                <p className="w-1/4 text-right">
                  {Payrolls[0].total_hours_overtime}{" "}
                </p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="w-1/2">Working Days</p>
                <p className="w-1/4 text-right">{Payrolls[0].working_days}</p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-2">
                <p className="w-1/2">Gross Pay:</p>
                <p className="w-1/4 text-right">
                  {data[0].gross_salary.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-4 mb-2">
                <p className="w-1/2 font-bold">Deductions</p>
                <p className="w-1/4 text-right font-bold">Amount (P) </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Tax</p>
                <p className="w-1/4 text-right">
                  {data[1].tax.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Pag-Ibig</p>
                <p className="w-1/4 text-right">
                  {data[1].pagibig.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">PhilHealth</p>
                <p className="w-1/4 text-right">
                  {data[1].philhealth.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Cash Advance</p>
                <p className="w-1/4 text-right">
                  {data[1].cash_advance.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">SSS</p>
                <p className="w-1/4 text-right">
                  {data[1].sss.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-2">
                <p className="w-1/2">Total Deductions:</p>
                <p className="w-1/4 text-right">
                  {data[1].total_deduction.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="w-1/2">Net Pay:</p>
                <p className="w-1/2 text-right">
                  {data[0].net_salary.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-gray-400 pt-4 mt-4 flex">
                <p className="text-sm italic">
                  Payment Date: {Payrolls[0].month}
                </p>
                <div className=" w-full rounded-3xl flex justify-end">
                  <PDFDownloadLink
                    document={
                      <PdfFile
                        data={data}
                        userDetails={getUser}
                        userPayroll={Payrolls}
                      />
                    }
                    fileName="Payslip"
                  >
                    {({ loading }) =>
                      loading ? (
                        <button className="w-36 h-10">Loading..</button>
                      ) : (
                        <button className="w-36 h-10 rounded-md bg-red-600 hover:opacity-90 font-bold">
                          Download Payslip
                        </button>
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

export default User;
