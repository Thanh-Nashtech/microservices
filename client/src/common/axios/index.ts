import axios from "axios";
import { SERVER_URL } from "../../config/app.config";
export default function () {
  const instance = axios.create({
    baseURL: SERVER_URL,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  });
  instance.interceptors.response.use(
    response => response,
    error => {
      alert(error.response.data.message)
      throw error;
    }
  );

  return instance
}
