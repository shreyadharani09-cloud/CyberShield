import axios from "axios";

const api = axios.create({
  baseURL: "https://cybershieldserver.onrender.com/api"
});

export default api;