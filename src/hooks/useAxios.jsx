
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pet-management-platform-server-site.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
