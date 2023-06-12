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

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  columnCotainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "grey",
  },
  page: {
    backgroundColor: "#F8E8CE",
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
});

const PDFContent = ({ data, userDetails, userPayroll }) => {
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    !userDetails ||
    userDetails.length === 0 ||
    !userPayroll ||
    userPayroll.length === 0
  ) {
    return null;
  }

  return (
    <Document>
      <Page style={styles.body} size="A4">
        <Text style={styles.title}>CODEWAVE</Text>
        <Text style={styles.header} fixed>
          Salary Slip For The month of {userPayroll[0]?.month}
        </Text>
        <Line style={styles.line} />
        <Text style={styles.text}>Employee ID: {userDetails[0]?.id}</Text>
        <Text style={styles.text}>Employee Name: {userDetails[0]?.name}</Text>
        <Text style={styles.text}>Position: {userDetails[0]?.position}</Text>
        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            Paid Days: {userPayroll[0]?.working_days}
          </Text>
          <Text style={styles.text}>
            Total Hours Overtime: {userPayroll[0]?.total_hours_overtime}
          </Text>
        </View>

        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            Gross Salary: {data[0]?.gross_salary.toLocaleString()}
          </Text>
          <Text style={styles.text}>
            Net Salary: {data[0]?.net_salary.toLocaleString()}
          </Text>
        </View>

        <Text style={styles.header} fixed>
          Deduction
        </Text>
        <Line style={styles.line} />
        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            PhilHealth: {data[1]?.philhealth?.toLocaleString()}
          </Text>
          <Text style={styles.text}>Tax: {data[1]?.tax?.toLocaleString()}</Text>
        </View>
        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            Cash Advance: {data[1]?.cash_advance?.toLocaleString()}
          </Text>
          <Text style={styles.text}>
            Pag-ibig: {data[1]?.pagibig?.toLocaleString()}
          </Text>
        </View>
        <Text style={styles.text}>
          Total Deduction: {data[1]?.total_deduction?.toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};

const SalaryLogs = (props) => {
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

  console.log(Payrolls);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="min-h-[80%] min-w-[80%] backdrop-blur-sm rounded-3xl flex flex-col justify-start ">
        <h1 className="text-5xl font-bold mx-6 my-2 text-white mb-6">Salary</h1>

        <table className="min-w-full text-justify text-sm font-bold text-white px-20">
          {isLoading && <Loader />}
          <thead>
            <tr className="font-bold text-3xl text-black bg-blue-green ">
              <th>Gross Salary</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 && (
              <tr
                key={data[0].id}
                className="hover:bg-gray-600  hover:ease-in cursor-pointer rounded-lg bg-gray-400"
              >
                <td className="text-lg font-semibold">
                  {data[0].gross_salary}
                </td>
                <td className="text-lg font-semibold ">
                  {data[0].net_salary.toLocaleString()}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h1 className="text-5xl font-bold mx-6 my-10 text-red-500 mb-6">
          Deduction
        </h1>

        <table className="min-w-full text-justify text-sm font-bold text-white px-20">
          {isLoading && <Loader />}
          <thead>
            <tr className="font-bold text-2xl text-black bg-blue-green">
              <th>Pag-ibig</th>
              <th>Philhealth</th>
              <th>SSS</th>
              <th>Tax</th>
              <th>Total Deduction</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 && (
              <tr
                key={data[1].id}
                className="hover:bg-gray-600 hover:ease-in cursor-pointer  rounded-lg bg-gray-400"
              >
                <td className="text-lg font-semibold">{data[1].pagibig}</td>
                <td className="text-lg font-semibold ">{data[1].philhealth}</td>
                <td className="text-lg font-semibold ">{data[1].sss}</td>
                <td className="text-lg font-semibold ">{data[1].tax}</td>
                <td className="text-lg font-semibold ">
                  {data[1].total_deduction}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-evenly text-white font-bold">
          <div className="w-20 rounded-md flex justify-center bg-red-700 mt-20 py-2">
            <Button
              label="Return"
              onClick={() => {
                navigate("/AdminDashboard/PayrollLog");
                refetch();
              }}
            />
          </div>
          <div className="w-20 rounded-md flex justify-center bg-red-700 mt-20 py-2">
            <PDFDownloadLink
              document={
                <PDFContent
                  data={data}
                  userDetails={getUser}
                  userPayroll={Payrolls}
                />
              }
              fileName="Payslip"
            >
              {({ loading }) =>
                loading ? <button>Loading..</button> : <button>Download</button>
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryLogs;
