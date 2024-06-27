import React from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import './UploadAndModifyData.css';

const dataHeaders = [
    '性別', '姓名', '員工編號', '部門', '職稱', '使用運具概況', '狀態', '備註'
]

const fakeData = [
    { '性別': '男', '姓名': '陳美華', '員工編號': 'A001', '部門': '研發部', '職稱': '工程師', '使用運具概況': '火車、公車、走路、機車', '狀態': 'active', '備註': '無' },
    { '性別': '女', '姓名': '許曉明', '員工編號': 'B002', '部門': '行政部', '職稱': '行政助理', '使用運具概況': '走路、汽車', '狀態': 'inactive', '備註': '無' },
    { '性別': '男', '姓名': '李子賢', '員工編號': '7414', '部門': '復健中心', '職稱': '病患', '使用運具概況': '爬行', '狀態': '快死了', '備註': '無' },
]

function UploadAndModifyData() {

    return (
        <div className='employee-travel'>
            <div>
                <CarbonDataTable headers={dataHeaders} data={fakeData} />
            </div>
        </div>
    );
}
export default UploadAndModifyData;