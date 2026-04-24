import axios from 'axios';

const axiosInstance = axios.create({
    // Replace with your backend URL if it changes
    baseURL: 'http://localhost:5000', 
    // This allows the browser to handle the JWT cookie automatically
    withCredentials: true 
});

export default axiosInstance;