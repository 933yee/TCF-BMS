export const chineseToEnglishMap = {
    '數據總覽': 'data-overview',
    '碳足跡數據總覽': 'carbon-footprint-data-overview',
    '通勤碳足跡數據': 'commuting-carbon-footprint-data',
    '運輸碳足跡數據': 'transportation-carbon-footprint-data',
    '交通工具使用現況': 'current-usage-of-transportation-modes',
    '交通車使用現況': 'current-usage-of-public-transportation',
    '積點狀況': 'accumulation-status',
    '員工差旅': 'employee-travel',
    '上游運輸': 'upstream-transportation',
    '下游運輸': 'downstream-transportation',
    '員工通勤': 'employee-commuting',
    '公務車': 'official-vehicle',
    '上傳與修改資料': 'upload-and-modify-data'
};

export const englishToChineseMap = {
    'data-overview': '數據總覽',
    'carbon-footprint-data-overview': '碳足跡數據總覽',
    'commuting-carbon-footprint-data': '通勤碳足跡數據',
    'transportation-carbon-footprint-data': '運輸碳足跡數據',
    'current-usage-of-transportation-modes': '交通工具使用現況',
    'current-usage-of-public-transportation': '交通車使用現況',
    'accumulation-status': '積點狀況',
    'employee-travel': '員工差旅',
    'upstream-transportation': '上游運輸',
    'downstream-transportation': '下游運輸',
    'employee-commuting': '員工通勤',
    'official-vehicle': '公務車',
    'upload-and-modify-data': '上傳與修改資料'
};

// export const departmentStructure = (data) => {
//     let department = {};
//     for (employee in data.employeeInfo) {
//         const dept = employee.dept;
//         if (dept in department) {
//             department[dept].push(employee);
//             department[dept].totalCarbon += employee.totalCarbon;
//         } else {
//             department[dept] = [employee];
//             department[dept].totalCarbon = employee.totalCarbon;
//         }
//     }
// }