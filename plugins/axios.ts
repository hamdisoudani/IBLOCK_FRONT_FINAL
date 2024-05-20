import {getSession, useSession} from "next-auth/react"
import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    timeout: 5000
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async config => {
      // Retrieve the access token from localStorage
      //const accessToken = localStorage.getItem('accessToken');
      const session = await getSession();
      // If access token is available, add it to the request headers
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
      }
  
      return config;
    },
    error => {
      // Handle request error
      return Promise.reject(error);
    }
);

export default axiosInstance;
