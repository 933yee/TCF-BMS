export function changeDepartment(newDepartment) {
    return {
        type: '@SEARCH/CHANGE_DEPARTMENT',
        newDepartment,
    };
}

export function changeUnit(newUnit) {
    return {
        type: '@SEARCH/CHANGE_UNIT',
        newUnit,
    };
}

export function changeStartTime(newStartTime) {
    return {
        type: '@SEARCH/CHANGE_START_TIME',
        newStartTime,
    };
}

export function changeEndTime(newEndTime) {
    return {
        type: '@SEARCH/CHANGE_END_TIME',
        newEndTime,
    };
}

export function changePageState(newPage) {
    return {
        type: '@PAGE/CHANGE_PAGE_STATE',
        newPage,
    };
}

export function changeCurrentPage(currentPage) {
    return {
        type: '@PAGE/CHANGE_CURRENT_PAGE',
        currentPage,
    };
}

export function deletePage(deletedPage) {
    return {
        type: '@PAGE/DELETE_PAGE',
        deletedPage,
    };
}

export function loginAndLoading(loginInfo) {
    return {
        type: '@USER/LOGIN_AND_LOADING',
        loginInfo,
    };
}

export function login(loginInfo) {
    return {
        type: '@USER/LOGIN',
        loginInfo,
    };
}

// export function postOverview(overview) {
//     return {
//         type: '@DATA/POST_OVERVIEW',
//         overview,
//     };
// }

// export function postEmployeeOverview(employeeOverview) {
//     return {
//         type: '@DATA/POST_EMPLOYEE_OVERVIEW',
//         employeeOverview,
//     };
// }

export const initializeDatabase = () => {
    return {
        type: '@POST/INIT_LOCAL_DATABASE',
    };
};

export function initDataOverview(dataOverview) {
    return {
        type: '@POST/INIT_DATA_OVERVIEW',
        dataOverview,
    };
}

export function initEmployeeCommutingData(employeeCommutingData) {
    return {
        type: '@POST/INIT_EMPLOYEE_COMMUTING_DATA',
        employeeCommutingData,
    };
}

export function initEmployeeCommutingDataDetail(employeeCommutingDataDetail) {
    return {
        type: '@POST/INIT_EMPLOYEE_COMMUTING_DATA_DETAIL',
        employeeCommutingDataDetail,
    };
}

export function updateEmployeeCommutingData(employeeCommutingData) {
    return {
        type: '@POST/EMPLOYEE_COMMUTING_DATA',
        employeeCommutingData,
    };
}

export const addVehicleData = (vehicleData) => {
    return {
        type: '@POST/ADD_VEHICLE_DATA',
        vehicleData
    };
};

export const deleteVehicleData = (selectedRows) => {
    return {
        type: '@POST/DELETE_VEHICLE_DATA',
        selectedRows
    };
};

export const updateVehicleData = (vehicleData) => {
    return {
        type: '@POST/UPDATE_VEHICLE_DATA',
        vehicleData
    };
}

export const updateVehicleBindData = (vehicleBindEmployeeData) => {
    return {
        type: '@POST/UPDATE_VEHICLE_BIND_EMPLOYEE',
        vehicleBindEmployeeData
    };
}

export const addEmployeeData = (employeeData) => {
    return {
        type: '@POST/ADD_EMPLOYEE_DATA',
        employeeData
    };
};

export const deleteEmployeeData = (selectedRows) => {
    return {
        type: '@POST/DELETE_EMPLOYEE_DATA',
        selectedRows
    };
};