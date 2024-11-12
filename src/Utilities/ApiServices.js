import axios from 'axios';
const baseApiUrl = "https://api.carbon-walker.com";
const api = axios.create({
    baseURL: baseApiUrl,
    timeout: 100000,
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


export const GetEmployeeOverviewDay = async (token, employeeCode, startDate) => {
    try {
        const response = await api.get(`/api/v0/dashboard/employeeOverviewDay?employeeCode=${employeeCode}&startDate=${startDate}`, {
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

export const AddEmployee = async (username, departmentId, employeeName, employeeCode) => {
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
