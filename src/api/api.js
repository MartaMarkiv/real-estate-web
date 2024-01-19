import axios from "axios";

export default axios.create({
  baseURL: "https://newsapi.org/v2/"
  // baseURL: "http://185.107.237.254:8000/"
});