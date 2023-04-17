import axios from "axios";

const baseURL = "http://localhost:6869/";

export default axios.create({ baseURL: baseURL });