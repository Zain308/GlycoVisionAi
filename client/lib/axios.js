import axios from 'axios';

// Dynamically use the Vercel env variable in production, fallback to localhost for dev
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Essential for handling cookies/sessions between domains
});

export default axiosInstance;