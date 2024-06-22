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
    pages: ['數據總覽'],
    currentPage: '數據總覽',
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
};

export function loginState(state = initLogin, action) {
    switch (action.type) {
        case '@USER/LOGIN_AND_LOADING':
            return {
                ...state,
                loading: action.loginInfo,
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