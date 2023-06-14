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

  const { data:Payroll, isLoading } = useQuery(
    ["pay"],
    async () => {
      const response = await axios.get(`/salary`, { headers });
      const value = Object.values(response?.data);
      const filterPayroll = value[0]
        .filter((item) => item.user_id == id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return filterPayroll.length > 0 ? [filterPayroll[0]] : [];
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
      keepPreviousData: true
    }
  );

  const salaryId = Payroll && Payroll.length > 0 ? Payroll[0].id : null;

  const { data:Salary, isLoading:salaryLoad} = useQuery(
    ["salary"],
    async () => {
      const response = await axios.get(`/salary`, { headers });
      const value = Object.values(response?.data);
      const filterSalary = value[1]
        .filter((item) => item.id == salaryId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return filterSalary.length > 0 ? [filterSalary[0]] : [];
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
      keepPreviousData: true
    }
  );

  
 

  const { data: getUser } = useQuery(
    ["name"],
    async () => {
      const response = await axios.get(`/getUser`, { headers });
      const value = Object.values(response?.data);
      const filterData = value?.filter((item) => item.id == id);
      return filterData;
    },
    
  );

  const { data: Payrolls } = useQuery(
    ["payroll"],
    async () => {
      const response = await axios.get(`/payroll/` + id, { headers });
      return response?.data
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
      keepPreviousData: true,
      select: (data) => {
        if (data && Array.isArray(data)) {
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
          });
          return sortedData[0];
        }
        return data;
      },
    }
  );
  

  
  if (
    !Array.isArray(Payroll) ||
    Payroll.length === 0 ||
    !getUser ||
    getUser.length === 0 ||
    !Payrolls ||
    Payrolls.length === 0 ||
    !Salary ||
    !Salary.length === 0
  ) {
    return null;
  }

 
  console.log(Payrolls)
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex flex-col w-[80%] max-h-[80%]">
        {isLoading ? (
          <Loader />
        ) : (
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
              {/* <div className="flex justify-between mb-2">
                <p className="w-1/2">Rate</p>
                <p className="w-1/4 text-right">{data[0].rate}</p>
              </div> */}
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Total Hours Overtime</p>
                <p className="w-1/4 text-right">
                  {Payrolls.total_hours_overtime}
                </p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="w-1/2">Working Days</p>
                <p className="w-1/4 text-right">{Payrolls.working_days}</p>
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
                  {Salary[0]?.tax?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Pag-Ibig</p>
                <p className="w-1/4 text-right">
                  {Salary[0]?.pagibig?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">PhilHealth</p>
                <p className="w-1/4 text-right">
                  {Salary[0]?.philhealth?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">Cash Advance</p>
                <p className="w-1/4 text-right">
                  {Salary[0]?.cash_advance?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="w-1/2">SSS</p>
                <p className="w-1/4 text-right">
                  {Salary[0]?.sss?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-400 pt-2">
                <p className="w-1/2">Total Deductions:</p>
                <p className="w-1/4 text-right">
                  {Salary[0]?.total_deduction?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="w-1/2">Net Pay:</p>
                <p className="w-1/2 text-right">
                  {Payroll[0]?.net_salary?.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-gray-400 pt-4 mt-4 flex">
                <p className="text-sm italic">
                  Payment Date: {Payrolls.month}
                </p>
                <div className=" w-full rounded-3xl flex justify-end">
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
