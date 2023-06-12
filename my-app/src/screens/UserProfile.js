import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import React from "react";
import { PDFContent } from "./SalaryLogs";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

const UserProfile = () => {
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const { id } = useParams();

  const { data: Profile, isLoading } = useQuery(["id"], async () => {
    const response = await axios.get(`/profile/` + id, { headers });
    const value = Object.values(response);
    return value;
  });

  return (
    <div className="bg-gray-100 p-8">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full object-cover" src="employee-picture.jpg" alt="Employee Picture" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-600">Employee ID: 12345</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-800">Payment Information</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-700">Bank Name: ABC Bank</p>
            <p className="text-sm text-gray-700">Account Number: ******7890</p>
            <p className="text-sm text-gray-700">Routing Number: ******1234</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-800">Salary Details</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-700">Salary: $5000</p>
            <p className="text-sm text-gray-700">Payment Frequency: Monthly</p>
            <p className="text-sm text-gray-700">Tax Deductions: $500</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default UserProfile;
