import React from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import './EmployeeCommuting.css';

const dataHeaders = [
    '紀錄', '姓名', '員工編號', '交通工具', '公里數', '碳足跡-KG', '減少碳足跡', '查看'
]

const fakeData = [
    { '紀錄': '自動', '姓名': '陳美華', '員工編號': 'A001', '交通工具': '火車、公車、走路、機車', '公里數': 25, '碳足跡-KG': 2.02, '減少碳足跡': 2.02, '查看': '🔍' },
    { '紀錄': '手動', '姓名': '許曉明', '員工編號': 'B002', '交通工具': '走路、汽車', '公里數': 15, '碳足跡-KG': 1.89, '減少碳足跡': 1.89, '查看': '🔍' },
]

function EmployeeCommuting() {

    return (
        <div className='employee-travel'>
            <div>
                <CarbonDataTable headers={dataHeaders} data={fakeData} />
            </div>
        </div>
    );
}
export default EmployeeCommuting;