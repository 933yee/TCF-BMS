import axios from 'axios';

const baseApiUrl = 'http://api.wavjaby.nckuctf.org:80';
// const baseApiUrl = 'https://api.carbon-walker.com:80';
// https://api.carbon-walker.com:80
const api = axios.create({
    baseURL: baseApiUrl,
    timeout: 10000,
});

export const UserLogin = async (account, password) => {
    try {
        const response = await api.post('/api/v0/auth/login', {
            "username": account,
            "password": password
        });
        return response;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
    }
};

export const GetDashBoardOverview = async (token, startDate) => {
    try {
        const response = await api.get(`/api/v0/dashboard/overview?startDate=${startDate}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error GetDashBoardOverview:', error);
        throw error;
    }
}


export const GetEmployeeOverview = async (token, startDate) => {
    try {
        const response = await api.get(`/api/v0/dashboard/employeeOverview?startDate=${startDate}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error GetDashBoardOverview:', error);
        throw error;
    }
}
