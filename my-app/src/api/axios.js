import axios from "axios";
let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
export default axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: headers
});
