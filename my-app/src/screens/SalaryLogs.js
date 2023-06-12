import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Line,
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import PdfFile from "../components/PdfFIle";


// export const PDFContent = ({ data, userDetails, userPayroll }) => {

//   const styles = StyleSheet.create({
//     body: {
//       paddingTop: 35,
//       paddingBottom: 65,
//       paddingHorizontal: 35,
//     },
  
//     title: {
//       fontSize: 36,
//       fontWeight: "bold",
//       textAlign: "center",
//     },
//     text: {
//       margin: 12,
//       fontSize: 14,
//       textAlign: "justify",
//     },
//     columnCotainer: {
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginBottom: 10,
//     },
//     header: {
//       fontSize: 24,
//       marginBottom: 20,
//       marginTop: 30,
//       textAlign: "center",
//       color: "grey",
//     },
//     page: {
//       backgroundColor: "#F8E8CE",
//     },
//     line: {
//       marginTop: 10,
//       marginBottom: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: "#000000",
//     },
//   });
  

//   if (
//     !Array.isArray(data) ||
//     data.length === 0 ||
//     !userDetails ||
//     userDetails.length === 0 ||
//     !userPayroll ||
//     userPayroll.length === 0
//   ) {
//     return null;
//   }

//   return (
//     <Document>
//       <Page style={styles.body} size="A4">
//         <Text style={styles.title}>CODEWAVE</Text>
//         <Text style={styles.header} fixed>
//           Salary Slip For The month of {userPayroll[0]?.month}
//         </Text>
//         <Line style={styles.line} />
//         <Text style={styles.text}>Employee ID: {userDetails[0]?.id}</Text>
//         <Text style={styles.text}>Employee Name: {userDetails[0]?.name}</Text>
//         <Text style={styles.text}>Position: {userDetails[0]?.position}</Text>
//         <View style={styles.columnCotainer}>
//           <Text style={styles.text}>
//             Paid Days: {userPayroll[0]?.working_days}
//           </Text>
//           <Text style={styles.text}>
//             Total Hours Overtime: {userPayroll[0]?.total_hours_overtime}
//           </Text>
//         </View>

//         <View style={styles.columnCotainer}>
//           <Text style={styles.text}>
//             Gross Salary: {data[0]?.gross_salary.toLocaleString()}
//           </Text>
//           <Text style={styles.text}>
//             Net Salary: {data[0]?.net_salary.toLocaleString()}
//           </Text>
//         </View>

//         <Text style={styles.header} fixed>
//           Deduction
//         </Text>
//         <Line style={styles.line} />
//         <View style={styles.columnCotainer}>
//           <Text style={styles.text}>
//             PhilHealth: {data[1]?.philhealth?.toLocaleString()}
//           </Text>
//           <Text style={styles.text}>Tax: {data[1]?.tax?.toLocaleString()}</Text>
//         </View>
//         <View style={styles.columnCotainer}>
//           <Text style={styles.text}>
//             Cash Advance: {data[1]?.cash_advance?.toLocaleString()}
//           </Text>
//           <Text style={styles.text}>
//             Pag-ibig: {data[1]?.pagibig?.toLocaleString()}
//           </Text>
//         </View>
//         <Text style={styles.text}>
//           Total Deduction: {data[1]?.total_deduction?.toLocaleString()}
//         </Text>
//       </Page>
//     </Document>
//   );
// };

const SalaryLogs = () => {
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(
    ["id"],
    async () => {
      const response = await axios.get(`/salary/` + id, { headers });
      const value = Object.values(response.data);
      return value;
    },
    {
      refetchInterval: 2000,
      keepPreviousData: false,
      cacheTime: 10,
      refetchIntervalInBackground: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  const { data: getUser } = useQuery(["name"], async () => {
    const response = await axios.get(`/getUser`, { headers });
    const value = Object.values(response.data.data);
    const filterData = value.filter((item) => item.id == id);
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
    <div className="flex w-full min-h-screen max-h-screen justify-center items-center">
      <div className="flex flex-col w-[80%] max-h-[80%]">
        {isLoading ? (
          <h1 className="text-3xl font-extrabold mt-[15%]">
            No Existing Salary
          </h1>
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
                <div className=" w-full rounded-3xl flex justify-end gap-2">
                 <div className="bg-blue-600 w-20 h-10 rounded-lg">
                 <Button 
                  label = "Close"
                  onClick = {() => navigate("/AdminDashboard/PayrollLog")}
                  />
                 </div>
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
                        <div className="w-20 h-10 bg-red-600 rounder-lg">
                          <Button 
                          label= "Loading.."
                        />
                        </div>
                      ) : (
                        <div className="w-20 h-10 rounded-lg bg-red-600 hover:opacity-80">
                          <Button 
                        label= "Download"
                        />
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
