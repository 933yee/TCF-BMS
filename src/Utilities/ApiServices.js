import axios from 'axios';
const baseApiUrl = "https://api.carbon-walker.com";
const api = axios.create({
    baseURL: baseApiUrl,
    timeout: 100000,
});

export const UserLogin = async (username, password) => {
    try {
        const response = await api.post('/api/v0/auth/login', {
            "username": username,
            "password": password
        });
        return response;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
    }
};

export const UserRegister = async (username, password, email) => {
    try {
        const response = await api.post('/api/v0/auth/register', {
            "firstname": "",
            "lastname": "",
            "username": username,
            "avatarId": 0,
            "email": email,
            "password": password,
        });
        return response;
    } catch (error) {
        console.error('Error Register:', error);
        throw error;
    }
};

export const GetDashBoardOverview = async (token, startDate) => {
    try {
        console.log(token);
        console.log(startDate);
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


export const GetEmployeeOverview = async (token, startDate, endDate) => {
    try {
        const response = await api.get(`/api/v0/dashboard/employeeOverview?startDate=${startDate}&endDate=${endDate}`, {
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


export const GetEmployeeOverviewDay = async (token, employeeCode, startDate, endDate) => {
    try {
        const response = await api.get(`/api/v0/dashboard/employeeOverviewDay?employeeCode=${employeeCode}&startDate=${startDate}&endDate=${endDate}`, {
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

export const GetReverse = async (token, lat, lon) => {
    try {
        console.log(lat, lon);
        const response = await api.get(`/api/v0/util/reverse?lat=${lat}&lon=${lon}`, {
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

export const GetDepartment = async (token) => {
    try {
        const response = await api.get(`/api/v0/company/department`, {
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