import React from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import './UpstreamTransportation.css';
import Toolbar from 'Components/Toolbar.jsx';

const dataHeaders = [
    '廠商', '員工姓名', '運輸時間', '交通工具', '貨物公斤', '公里數', '碳足跡-KG', '查看'
]

const fakeData = [
    { '廠商': '嘉里大榮物流', '員工姓名': '蘇客輪', '運輸時間': '10:00-15:12', '交通工具': '3.49噸低溫貨車', '貨物公斤': 60, '公里數': 25, '碳足跡-KG': 2.02, '查看': '🔍' },
    { '廠商': '順豐速運', '員工姓名': '蘇客輪', '運輸時間': '12:00-13:12', '交通工具': '7.5~16噸低溫貨車服務', '貨物公斤': 40, '公里數': 35, '碳足跡-KG': 1.02, '查看': '🔍' },
]

function UpstreamTransportation() {

    return (
        <> <Toolbar />
            <div className='employee-travel'>
                <div>
                    <CarbonDataTable headers={dataHeaders} data={fakeData} />
                </div>
            </div>
        </>
    );
}
export default UpstreamTransportation;