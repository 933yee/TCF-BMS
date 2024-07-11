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

export function postOverview(overview) {
    return {
        type: '@DATA/POST_OVERVIEW',
        overview,
    };
}

export function postEmployeeOverview(employeeOverview) {
    return {
        type: '@DATA/POST_EMPLOYEE_OVERVIEW',
        employeeOverview,
    };
}