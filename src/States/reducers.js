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
            console.log(state.currentPage === action.deletedPage ? newPages[newPages.length - 1] : state.currentPage,)
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
    account: '',
    token: '',
};

export function loginState(state = initLogin, action) {
    switch (action.type) {
        case '@USER/LOGIN_AND_LOADING':
            return {
                ...state,
                loading: action.loginInfo.loading,
                login: action.loginInfo.login,
                account: action.loginInfo.account,
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
        departmentList: ['研發部', '行政部', '市場部', '客服部', '財務部'],
    },
    data: {
        dataOverview: {},
        employeeTravel: {
            data: [
                ['自動', '陳美華', 'A001', '2024-07-01', '10:00 ~ 15:12', '5小時12分鐘', '火車、公車、走路、機車', 25, 2.02],
                ['手動', '許曉明', 'B002', '2024-07-02', '13:00 ~ 14:12', '1小時12分鐘', '走路、汽車', 15, 1.89],
                ['自動', '王揚鈞', 'A002', '2024-07-03', '15:00 ~ 15:32', '32分鐘', '公車', 7, 1.06],
                ['自動', '陳姓會', 'A005', '2024-07-04', '09:00 ~ 12:12', '3小時12分鐘', '機車', 13, 5.02],
                ['自動', '吳勝明', 'A006', '2024-07-05', '09:08 ~ 10:12', '1小時4分鐘', '機車', 32, 10.02],
                ['手動', '林秉聖', 'B008', '2024-07-06', '13:00 ~ 14:12', '1小時12分鐘', '走路、汽車', 6, 1.89],
                ['自動', '孫燕姿', 'A007', '2024-07-07', '11:00 ~ 13:12', '2小時12分鐘', '走路、機車', 12, 1.02],
                ['自動', '莫可霖', 'A009', '2024-07-08', '10:00 ~ 15:12', '5小時12分鐘', '火車、公車、走路、機車', 15, 2.02],
                ['手動', '梁志豪', 'B010', '2024-07-09', '08:00 ~ 10:00', '2小時', '火車', 50, 2.50],
                ['自動', '王冠中', 'A011', '2024-07-10', '09:30 ~ 10:45', '1小時15分鐘', '機車', 20, 4.50],
                ['手動', '李惠珍', 'B012', '2024-07-11', '14:00 ~ 15:30', '1小時30分鐘', '走路、公車', 10, 1.20],
                ['自動', '張淑芬', 'A013', '2024-07-12', '12:00 ~ 13:00', '1小時', '汽車', 18, 3.60],
                ['手動', '黃文祥', 'B014', '2024-07-13', '11:00 ~ 12:45', '1小時45分鐘', '走路、火車', 35, 2.80],
                ['自動', '趙麗華', 'A015', '2024-07-14', '08:15 ~ 09:45', '1小時30分鐘', '機車', 25, 6.25],
                ['手動', '鄭浩仁', 'B016', '2024-07-15', '13:30 ~ 15:00', '1小時30分鐘', '公車', 12, 1.40],
                ['自動', '吳佳穎', 'A017', '2024-07-16', '09:00 ~ 10:30', '1小時30分鐘', '機車', 30, 7.50],
                ['手動', '劉士龍', 'B018', '2024-07-17', '15:00 ~ 16:30', '1小時30分鐘', '走路、汽車', 20, 2.00],
            ]
        },
        employeeCommuting: {
            data: []
        },
        mobileSourceEmissions: {
            data: [
                ['研發部', '貨物長途運輸', 'A-001', '陳美華', '2021/10/02', '09:00 ~ 16:00', '7 小時', '營業小貨車(汽油)', 30, ''],
            ],
            detailedData: [
                [
                    ['2021/10/02', '09:00 ~ 10:00', '1 小時', '營業小貨車(汽油)', 5, '', ''],
                    ['2021/10/02', '10:00 ~ 12:00', '2 小時', '營業小貨車(汽油)', 2, '', ''],
                    ['2021/10/02', '12:00 ~ 14:00', '2 小時', '營業小貨車(汽油)', 8, '', ''],
                    ['2021/10/02', '14:00 ~ 16:00', '2 小時', '營業小貨車(汽油)', 15, '', ''],
                ],
            ],
        },
        vehicleData: {
            data: [
                ['A-001', '營業小貨車(汽油)', '貨物長途運輸', '', '', '',],
                ['B-002', '營業小貨車(汽油)', '貨物長途運輸', '', '', '',],
            ],
            vehicles: [
                "低地板甲類市區公車運輸服務(包含營業據點及公車站點排放)",
                "乙類市區公車運輸服務(包含營業據點及公車站點排放)",
                "普通甲類市區公車運輸服務(包含營業據點及公車站點排放)",
                "營業大客車(市區公車及公路客運-柴油)",
                "自用大客車(柴油)",
                "營業大貨車(柴油)",
                "營業小貨車(柴油)",
                "營業小貨車(汽油)",
                "自用大貨車(柴油)",
                "自用小貨車(柴油)",
                "自用小貨車(汽油)",
                "營業小貨車(汽油)",
                "營業小貨車(柴油)",
                "營業大貨車(柴油)",
                "3.49噸低溫貨車服務(裝載率32％，包含營業據點排放)",
                "3.49噸低溫貨車服務(裝載率77％，包含營業據點排放)",
                "3.5~7.4噸低溫貨車服務(裝載率41％，包含營業據點排放)",
                "3.5~7.4噸低溫貨車服務(裝載率69％，包含營業據點排放)",
                "3.49噸多溫貨車服務(包含營業據點排放)",
                "營業遊覽車(柴油)",
                "自用小客車(汽油)",
                "營業小客車(汽油)",
                "機器腳踏車(汽油)",
                "以柴油動力垃圾車清除運輸一般廢棄物"
            ],
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
        case '@POST/INIT_EMPLOYEE_COMMUTING_DATA':
            state.data.employeeCommuting.data = [];
            for (let employee of action.employeeCommutingData.employeeInfo) {
                const transportationTypes = [];
                for (let transportationType of employee.transportationTypes) {
                    switch (transportationType) {
                        case 'TRAIN':
                            transportationTypes.push('火車');
                            break;
                        case 'BUS':
                            transportationTypes.push('公車');
                            break;
                        case 'WALK':
                            transportationTypes.push('走路');
                            break;
                        case 'SCOOTER':
                            transportationTypes.push('機車');
                            break;
                        case 'CAR':
                            transportationTypes.push('汽車');
                            break;
                        case 'BIKE':
                            transportationTypes.push('腳踏車');
                            break;
                    }
                }
                state.data.employeeCommuting.data.push([
                    employee.name,
                    employee.code,
                    transportationTypes.join('、'),
                    employee.totalDistance / 1000,
                    employee.totalCarbon,
                    employee.reducedCarbon,
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