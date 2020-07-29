import axios from "axios";

const instance = axios.create({
  withCredentials: false,
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: { "Content-Type": "application/json" },
});

export default instance;
