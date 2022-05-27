import AuthContext from "../context/AuthProvider";
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});
