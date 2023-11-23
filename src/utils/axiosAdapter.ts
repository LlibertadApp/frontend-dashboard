import axios from 'axios'

export const staticDataAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_static_data_endpoint,
    timeout: 5000,
  });