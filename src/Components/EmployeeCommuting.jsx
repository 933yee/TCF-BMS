import React, { useState, useEffect } from 'react';

import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview } from 'Utilities/ApiServices.js';
import { connect, useDispatch } from 'react-redux';
import { postEmployeeOverview } from 'States/actions.js';

import Toolbar from 'Components/Toolbar.jsx';

import './EmployeeCommuting.css';

const dataHeaders = [
    '姓名', '員工編號', '交通工具', '公里數', '碳足跡-KG', '減少碳足跡', '查看'
]

const fakeData = [
    { '姓名': '陳美華', '員工編號': 'A001', '交通工具': '火車、公車、走路、機車', '公里數': 25, '碳足跡-KG': 2.02, '減少碳足跡': 2.02, '查看': '🔍' },
    { '姓名': '許曉明', '員工編號': 'B002', '交通工具': '走路、汽車', '公里數': 15, '碳足跡-KG': 1.89, '減少碳足跡': 1.89, '查看': '🔍' },
]

function EmployeeCommuting(props) {
    const dispatch = useDispatch();
    const [employeeData, setEmployeeData] = useState([]);

    const currentTime = new Date().getTime();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneMonthAgoTime = oneMonthAgo.getTime();

    function formatDate(date) {
        function padZero(num) {
            return num < 10 ? '0' + num : num;
        }
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        return `${year}-${month}-${day}%2B08:00`;
    }

    const endDate = formatDate(new Date(currentTime));
    const startDate = formatDate(new Date(oneMonthAgoTime));

    useEffect(() => {
        if (Object.keys(props.employeeOverview).length !== 0) {
            initEmployeeData(props.employeeOverview);
            return;
        }
        GetEmployeeOverview(props.token, startDate).then((response) => {
            dispatch(postEmployeeOverview(response.data.data));
            initEmployeeData(response.data.data);
        });
    }, []);

    const initEmployeeData = (employeeOverview) => {
        const data = [];
        for (let employee of employeeOverview.employeeInfo) {
            const transportationTypes = [];
            for (let transportationType of employee.transportationTypes) {
                if (transportationType === 'TRAIN') {
                    transportationTypes.push('火車');
                } else if (transportationType === 'BUS') {
                    transportationTypes.push('公車');
                } else if (transportationType === 'WALK') {
                    transportationTypes.push('走路');
                } else if (transportationType === 'SCOOTER') {
                    transportationTypes.push('機車');
                } else if (transportationType === 'CAR') {
                    transportationTypes.push('汽車');
                } else if (transportationType === 'BIKE') {
                    transportationTypes.push('腳踏車');
                }
            }
            data.push({
                '姓名': employee.name,
                '員工編號': employee.code,
                '交通工具': transportationTypes.join('、'),
                '公里數': employee.totalDistance / 1000,
                '碳足跡-KG': employee.totalCarbon,
                '減少碳足跡': employee.reducedCarbon,
                '查看': '🔍'
            });
        }
        setEmployeeData(data);
    }


    return (
        <><Toolbar />
            <div className='employee-travel'>
                <div>
                    <CarbonDataTable headers={dataHeaders} data={employeeData} />
                </div>
            </div>
        </>
    );
}
export default connect((state) => {
    return {
        ...state.loginState,
        ...state.dataState
    }
})(EmployeeCommuting);