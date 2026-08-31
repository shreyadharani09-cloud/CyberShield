import axios from "axios";

const api = axios.create({
  baseURL: "https://cybershield-sax5.onrender.com/api"
});

export default api;