const initSearchParams = {
    department: '',
    unit: '',
    startTime: '',
    endTime: '',
};

export function searchParams(state = initSearchParams, action) {
    switch (action.type) {
        case '@SEARCH/CHANGE_DEPARTMENT':
            return {
                ...state,
                department: action.newDepartment,
            }
        case '@SEARCH/CHANGE_UNIT':
            return {
                ...state,
                unit: action.newUnit,
            }
        case '@SEARCH/CHANGE_START_TIME':
            return {
                ...state,
                startTime: action.newStartTime,
            }
        case '@SEARCH/CHANGE_END_TIME':
            return {
                ...state,
                endTime: action.newEndTime,
            }
        default:
            return state;
    }
}


const initPages = {
    pages: ['data-overview'],
    currentPage: '/data-overview',
};

export function pageState(state = initPages, action) {
    switch (action.type) {
        case '@PAGE/CHANGE_PAGE_STATE': {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.pages[i] === action.newPage) {
                    return {
                        ...state,
                        currentPage: action.newPage,
                    };
                }
            }
            return {
                ...state,
                pages: [...state.pages, action.newPage],
                currentPage: action.newPage,
            };
        }
        case '@PAGE/CHANGE_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case '@PAGE/DELETE_PAGE': {
            const newPages = state.pages.filter((page) => page !== action.deletedPage);
            //console.log(state.currentPage === action.deletedPage ? newPages[newPages.length - 1] : state.currentPage,)
            return {
                ...state,
                pages: newPages,
                currentPage: state.currentPage === action.deletedPage ? newPages[newPages.length - 1] : state.currentPage,
            };
        }
        default:
            return state;
    }
}


const initLogin = {
    login: false,
    loading: false,
    // tmp
    basic_info: false,
    username: '',
    token: '',
};

export function loginState(state = initLogin, action) {
    switch (action.type) {
        case '@USER/LOGIN_AND_LOADING':
            return {
                ...state,
                loading: action.loginInfo.loading,
                login: action.loginInfo.login,
                basic_info: action.loginInfo.basic_info,
                username: action.loginInfo.username,
                token: action.loginInfo.token,
            };
        case '@USER/LOGIN':
            return {
                ...state,
                login: action.loginInfo,
            };
        default:
            return state;
    }
}


// const initDataState = {
//     overview: {},
//     employeeOverview: {},
// };

// export function dataState(state = initDataState, action) {
//     switch (action.type) {
//         case '@DATA/POST_OVERVIEW':
//             return {
//                 ...state,
//                 overview: action.overview,
//             };
//         case '@DATA/POST_EMPLOYEE_OVERVIEW':
//             return {
//                 ...state,
//                 employeeOverview: action.employeeOverview,
//             };
//         default:
//             return state;
//     }
// }

const initLocalDatabase = {
    toolbar: {
        departmentList: [],
    },
    data: {
        dataOverview: {},
        employeeBusinessTravel: {
            data: [],
            detailedData: [],
            vehicles:{
                "小客車":{
                    "coef":115,
                },
                "機車":{
                    "coef":95.1,
                },
                "電動車":{
                    "coef":78,
                },
                "公車":{
                    "coef":76.7,
                },
                "火車":{
                    "coef":54,
                },
                "高鐵":{
                    "coef":32,
                },
                "電動機車":{
                    "coef":25.2,
                },
            }
        },
        employeeCommuting: {
            data: [],
            detailedData: [],
            vehicles:{
                "小客車":{
                    "coef":115,
                },
                "機車":{
                    "coef":95.1,
                },
                "電動車":{
                    "coef":78,
                },
                "公車":{
                    "coef":76.7,
                },
                "火車":{
                    "coef":54,
                },
                "高鐵":{
                    "coef":32,
                },
                "電動機車":{
                    "coef":25.2,
                },
            }
        },
        mobileSourceEmissions: {
            data: [
                ['財務部', '貨物廠區運輸', 'B-002', '王大明', '2021/10/05', '08:00 ~ 12:00', '4 小時', '營業小貨車(柴油)', 20, ''],
                ['財務部', '貨物長途運輸', 'C-003', '林小慧', '2021/10/07', '10:00 ~ 17:00', '7 小時', '營業小貨車(汽油)', 35, ''],
                ['財務部', '貨物廠區運輸', 'D-004', '張美美', '2021/10/09', '09:00 ~ 13:00', '4 小時', '營業小貨車(柴油)', 18, ''],
                ['研發部', '貨物長途運輸', 'A-005', '劉德華', '2021/10/12', '11:00 ~ 18:00', '7 小時', '營業小貨車(汽油)', 32, ''],
                ['行政部', '貨物廠區運輸', 'E-006', '陳建安', '2021/10/15', '07:00 ~ 14:00', '7 小時', '營業小貨車(柴油)', 40, ''],
                ['財務部', '貨物長途運輸', 'F-007', '王志強', '2021/10/18', '12:00 ~ 19:00', '7 小時', '營業小貨車(汽油)', 36, ''],
                ['客服部', '人員運輸', 'G-008', '蔡依林', '2021/10/21', '09:00 ~ 12:00', '3 小時', '營業小貨車(柴油)', 12, ''],
                ['市場部', '貨物長途運輸', 'H-009', '周杰倫', '2021/10/24', '13:00 ~ 19:00', '6 小時', '營業小貨車(汽油)', 29, ''],
                ['研發部', '人員運輸', 'I-010', '林俊傑', '2021/10/27', '14:00 ~ 18:00', '4 小時', '營業小貨車(柴油)', 20, ''],
                ['客服部', '貨物長途運輸', 'J-011', '張學友', '2021/10/30', '10:00 ~ 17:00', '7 小時', '營業小貨車(汽油)', 33, ''],
            ],
            detailedData: [
                [
                    ['2021/10/05', '08:00 ~ 09:00', '1 小時', '營業小貨車(柴油)', 5, '', '', ''],
                    ['2021/10/05', '09:00 ~ 11:00', '2 小時', '營業小貨車(柴油)', 8, '', '', ''],
                    ['2021/10/05', '11:00 ~ 12:00', '1 小時', '營業小貨車(柴油)', 7, '', '', ''],
                ],
                [
                    ['2021/10/07', '10:00 ~ 12:00', '2 小時', '營業小貨車(汽油)', 10, '', '', ''],
                    ['2021/10/07', '12:00 ~ 14:00', '2 小時', '營業小貨車(汽油)', 12, '', '', ''],
                    ['2021/10/07', '14:00 ~ 17:00', '3 小時', '營業小貨車(汽油)', 13, '', '', ''],
                ],
                [
                    ['2021/10/09', '09:00 ~ 11:00', '2 小時', '營業小貨車(柴油)', 6, '', '', ''],
                    ['2021/10/09', '11:00 ~ 13:00', '2 小時', '營業小貨車(柴油)', 8, '', '', ''],
                ],
                [
                    ['2021/10/12', '11:00 ~ 13:00', '2 小時', '營業小貨車(汽油)', 9, '', '', ''],
                    ['2021/10/12', '13:00 ~ 16:00', '3 小時', '營業小貨車(汽油)', 11, '', '', ''],
                    ['2021/10/12', '16:00 ~ 18:00', '2 小時', '營業小貨車(汽油)', 12, '', '', ''],
                ],
                [
                    ['2021/10/15', '07:00 ~ 10:00', '3 小時', '營業小貨車(柴油)', 15, '', '', ''],
                    ['2021/10/15', '10:00 ~ 12:00', '2 小時', '營業小貨車(柴油)', 13, '', '', ''],
                    ['2021/10/15', '12:00 ~ 14:00', '2 小時', '營業小貨車(柴油)', 12, '', '', ''],
                ],
                [
                    ['2021/10/18', '12:00 ~ 14:00', '2 小時', '營業小貨車(汽油)', 8, '', '', ''],
                    ['2021/10/18', '14:00 ~ 17:00', '3 小時', '營業小貨車(汽油)', 10, '', '', ''],
                    ['2021/10/18', '17:00 ~ 19:00', '2 小時', '營業小貨車(汽油)', 8, '', '', ''],
                ],
                [
                    ['2021/10/21', '09:00 ~ 10:00', '1 小時', '營業小貨車(柴油)', 4, '', '', ''],
                    ['2021/10/21', '10:00 ~ 12:00', '2 小時', '營業小貨車(柴油)', 8, '', '', ''],
                ],
                [
                    ['2021/10/24', '13:00 ~ 15:00', '2 小時', '營業小貨車(汽油)', 8, '', '', ''],
                    ['2021/10/24', '15:00 ~ 19:00', '4 小時', '營業小貨車(汽油)', 14, '', '', ''],
                ],
                [
                    ['2021/10/27', '14:00 ~ 16:00', '2 小時', '營業小貨車(柴油)', 9, '', '', ''],
                    ['2021/10/27', '16:00 ~ 18:00', '2 小時', '營業小貨車(柴油)', 11, '', '', ''],
                ],
                [
                    ['2021/10/30', '10:00 ~ 12:00', '2 小時', '營業小貨車(汽油)', 10, '', '', ''],
                    ['2021/10/30', '12:00 ~ 15:00', '3 小時', '營業小貨車(汽油)', 11, '', '', ''],
                    ['2021/10/30', '15:00 ~ 17:00', '2 小時', '營業小貨車(汽油)', 12, '', '', ''],
                ],
            ],
        },
        vehicleData: {
            data: [
                ['A-001', '營業小貨車(汽油)', '貨物長途運輸', '', '', '',],
                ['B-002', '營業小貨車(汽油)', '貨物長途運輸', '', '', '',],
            ],
            vehicles: {
                "低地板甲類市區公車運輸服務(包含營業據點及公車站點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "乙類市區公車運輸服務(包含營業據點及公車站點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "普通甲類市區公車運輸服務(包含營業據點及公車站點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業大客車(市區公車及公路客運-柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "自用大客車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業大貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業小貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業小貨車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "自用大貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "自用小貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "自用小貨車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業小貨車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業小貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業大貨車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "3.49噸低溫貨車服務(裝載率32％，包含營業據點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "3.49噸低溫貨車服務(裝載率77％，包含營業據點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "3.5~7.4噸低溫貨車服務(裝載率41％，包含營業據點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "3.5~7.4噸低溫貨車服務(裝載率69％，包含營業據點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "3.49噸多溫貨車服務(包含營業據點排放)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業遊覽車(柴油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "自用小客車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "營業小客車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "機器腳踏車(汽油)": {
                    "coef": 0.,
                    "coef_unit": "",
                },
                "以柴油動力垃圾車清除運輸一般廢棄物": {
                    "coef": 0.,
                    "coef_unit": "",
                }
            },
            vehicleBindEmployee: {
                'A-001': 'A001',
            }
        },
        employeeData: {
            data: [
                ['陳美華', 'A001', '研發部', '工程師'],
                ['許曉明', 'B002', '行政部', '行政助理'],
                ['王大明', 'C003', '市場部', '市場經理'],
                ['林小菁', 'D004', '客服部', '客服專員'],
                ['張偉文', 'E005', '財務部', '會計師',],
            ],
            searchEmployeeCode: {
                'A001': ['陳美華', '研發部', '工程師'],
                'B002': ['許曉明', '行政部', '行政助理'],
                'C003': ['王大明', '市場部', '市場經理'],
                'D004': ['林小菁', '客服部', '客服專員'],
                'E005': ['張偉文', '財務部', '會計師'],
            }
        },
    }
};

export function localDatabaseState(state = initLocalDatabase, action) {
    switch (action.type) {
        case '@POST/INIT_DATA_OVERVIEW':
            state.data.dataOverview = action.dataOverview;
            return state;
        case '@POST/UPDATE_DEPARTMENT_LIST':
            state.toolbar.departmentList = action.departmentList;
            return state;
        case '@POST/INIT_EMPLOYEE_BUSINESS_TRAVEL_DATA':
            state.data.employeeBusinessTravel.data = [];
            for (let employee of action.employeeBusinessTravelData.employeeInfo) {
                state.data.employeeBusinessTravel.data.push([
                    employee.name,
                    employee.dept,
                    employee.code,
                    '12345',
                    employee.totalDistance / 1000,
                    employee.totalCarbon / 1000,
                    employee.reducedCarbon / 1000,
                ]);
            }
            return state;
        case '@POST/INIT_EMPLOYEE_COMMUTING_DATA':
            state.data.employeeCommuting.data = [];
            for (let employee of action.employeeCommutingData.employeeInfo) {
                state.data.employeeCommuting.data.push([
                    employee.name,
                    employee.dept,
                    employee.code,
                    '12345',
                    employee.totalDistance / 1000,
                    employee.totalCarbon / 1000,
                    employee.reducedCarbon / 1000,
                ]);
            }
            return state;
        case '@POST/ADD_VEHICLE_DATA':
            state.data.vehicleData.data.push(action.vehicleData);
            return state;
        case '@POST/DELETE_VEHICLE_DATA':
            action.selectedRows.forEach((selectedRow, index) => {
                if (selectedRow === true) {
                    delete state.data.vehicleData.vehicleBindEmployee[state.data.vehicleData.data[index][0]];
                }
            });

            const newVehicleData = state.data.vehicleData.data.filter((vehicle, index) => !action.selectedRows[index]);
            state.data.vehicleData.data = newVehicleData;
            return state;
        case '@POST/UPDATE_VEHICLE_DATA':
            state.data.vehicleData.vehicles = action.vehicleData;
            return state;
        case '@POST/UPDATE_VEHICLE_BIND_EMPLOYEE':
            state.data.vehicleData.vehicleBindEmployee[action.vehicleBindEmployeeData[0]] = action.vehicleBindEmployeeData[1];
            return state;
        case '@POST/ADD_EMPLOYEE_DATA':
            state.data.employeeData.data.push(action.employeeData);
            state.data.employeeData.searchEmployeeCode[action.employeeData[1]] = [action.employeeData[0], action.employeeData[2], action.employeeData[3]];
            return state;
        case '@POST/DELETE_EMPLOYEE_DATA':
            const newVehicleBindEmployee = { ...state.data.vehicleData.vehicleBindEmployee };
            action.selectedRows.forEach((selectedRow, index) => {
                if (selectedRow === true) {
                    for (let vehicle in newVehicleBindEmployee) {
                        if (newVehicleBindEmployee[vehicle] === state.data.employeeData.data[index][1]) {
                            delete newVehicleBindEmployee[vehicle];
                        }
                    }
                }
            });
            state.data.vehicleData.vehicleBindEmployee = newVehicleBindEmployee;

            const newEmployeeData = state.data.employeeData.data.filter((employee, index) => !action.selectedRows[index]);
            state.data.employeeData.data = newEmployeeData;
            state.data.employeeData.searchEmployeeCode = {};
            for (let employee of newEmployeeData) {
                state.data.employeeData.searchEmployeeCode[employee[1]] = [employee[0], employee[2], employee[3]];
            }
            return state;
        default:
            return state;
    }
}