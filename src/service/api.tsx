import axiosClient from './apiClient';

const appAPI = {
    getBasicMonitors: () => {
        const url = '/monitor';
        return axiosClient.get(url);
    },
};

export default appAPI;
