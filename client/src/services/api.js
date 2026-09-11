import axios from "axios";

const api = axios.create({
  baseURL: "https://cybershieldserver-sax5.onrender.com/api"
});

export default api;