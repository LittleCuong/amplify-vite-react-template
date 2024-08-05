import axios from 'axios';
import apiConfig from './apiConfig';
// import { fetchAuthSession } from 'aws-amplify/auth';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'content-Type': 'application/json',
    },
});

// axiosClient.interceptors.request.use(async (config) => {
//     const session = await fetchAuthSession();
//     config.headers.Authorization = `Bearer ${session.tokens?.accessToken}`;
//     return config;
// });

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
