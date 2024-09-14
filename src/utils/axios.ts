/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import axios, { AxiosRequestConfig } from 'axios';

// UI Local Components
import { HOST_API } from 'src/config-global';

/* -------------------------------------------------------------------------- */
/*                              CREATE DATA AXIOS                             */
/* -------------------------------------------------------------------------- */
const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

/* -------------------------------------------------------------------------- */
/*                              FETCH DATA AXIOS                              */
/* -------------------------------------------------------------------------- */
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

/* -------------------------------------------------------------------------- */
/*                                  ENDPOINTS                                 */
/* -------------------------------------------------------------------------- */
export const endpoints = {
  auth: {
    login: '/api/login',
  },
  lot: {
    list: '/api/lots',
    edit: '/lots'
  },
  dossier: {
    list: '/api/dossiers',
    edit: '/dossiers',
    details: (id?: number) => `api/dossiers/${id}`
  },
  user: {
    list: '/api/users',
    edit: '/users'
  },
};