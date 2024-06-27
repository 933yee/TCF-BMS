import React from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import './DetailedData.css';
import { AiFillEdit } from "react-icons/ai";

const dataHeaders = [
    '紀錄', '姓名', '員工編號', '交通工具', '公里數', '碳足跡-KG', '紀錄完整度', '編輯'
]

const fakeData = [
    { '紀錄': '自動', '姓名': '蘇客輪', '員工編號': 'A001', '交通工具': '火車、公車、走路、機車', '公里數': 25, '碳足跡-KG': 2.02, '紀錄完整度': '100%', '編輯': <AiFillEdit /> },
    { '紀錄': '手動', '姓名': '蘇客輪', '員工編號': 'B002', '交通工具': '走路、汽車', '公里數': 15, '碳足跡-KG': 1.89, '紀錄完整度': '100%', '編輯': <AiFillEdit /> },
]

function DetailedData(props) {

    return (
        <div className='employee-travel'>
            <div>
                <CarbonDataTable headers={dataHeaders} data={fakeData} />
            </div>
        </div>
    );
}
export default DetailedData;