import axios from "axios";

const instance = axios.create({
  baseURL: `https://snake-server-5qg1.onrender.com/`,
});

export default instance;
