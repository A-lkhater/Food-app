import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1",
  timeout: 5000,
});

export default axiosClient;
