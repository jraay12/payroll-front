import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Line,
} from "@react-pdf/renderer";


const PdfFile = ({ salary, payroll, userDetails, userPayroll }) => {
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

  if (
    !Array.isArray(salary) ||
    salary.length === 0 ||
    !userDetails ||
    userDetails.length === 0 ||
    !userPayroll ||
    userPayroll.length === 0 ||
    !payroll ||
    payroll === 0
  ) {
    return null;
  }

  console.log(userPayroll)
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <Text style={styles.title}>CODEWAVE</Text>
        <Text style={styles.header} fixed>
          Salary Slip For The month of {userPayroll?.month || userPayroll[0]?.month }
        </Text>
        <Line style={styles.line} />
        <Text style={styles.text}>Employee ID: {userDetails[0]?.id}</Text>
        <Text style={styles.text}>Employee Name: {userDetails[0]?.name}</Text>
        <Text style={styles.text}>Position: {userDetails[0]?.position}</Text>
        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            Paid Days: {userPayroll?.working_days || userPayroll[0]?.working_days}
          </Text>
          <Text style={styles.text}>
            Total Hours Overtime: {userPayroll?.total_hours_overtime|| userPayroll[0]?.total_hours_overtime }
          </Text>
        </View>

        <View style={styles.columnCotainer}>
          <Text style={styles.text}>
            Gross Salary: {payroll[0]?.gross_salary.toLocaleString()}
          </Text>
          <Text style={styles.text}>
            Net Salary: {payroll[0]?.net_salary.toLocaleString()}
          </Text>
        </View>

        <Text style={styles.header} fixed>
          Deduction
        </Text>
        <Line style={styles.line} />
        <Text style={styles.text}>
          PhilHealth: {salary[0]?.philhealth?.toLocaleString()}
        </Text>
        <Text style={styles.text}>
          Cash Advance: {salary[0]?.cash_advance?.toLocaleString()}
        </Text>
        <Text style={styles.text}>
          Pag-ibig: {salary[0]?.pagibig?.toLocaleString()}
        </Text>
        <Text style={styles.text}>Tax: {salary[0]?.tax?.toLocaleString()}</Text>
        <Text style={styles.text}>
          Total Deduction: {salary[0]?.total_deduction?.toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfFile;
