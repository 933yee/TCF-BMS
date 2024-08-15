import React, { useState, useEffect } from 'react';

import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview } from 'Utilities/ApiServices.js';
import { connect, useDispatch } from 'react-redux';
import { initEmployeeCommutingData } from 'States/actions.js';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';
import Toolbar from 'Components/Toolbar.jsx';

import './EmployeeCommuting.css';

function EmployeeCommuting(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [rerenderKey, setRerenderKey] = useState(0);
    const headers = [
        '姓名', '員工編號', '交通工具', '公里數', '碳足跡-KG', '減少碳足跡'
    ]
    const data = props.data.employeeCommuting.data;

    const handleLinkClick = (index) => {
        // if (canCheckDetail === false) return;
        // const newPath = `${location.pathname}${index}`;
        // navigate(newPath);
    };

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleTextFieldChange = (event) => {
        console.log(event.target.value);
    }

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
        if (Object.keys(data).length !== 0) return;
        GetEmployeeOverview(props.token, startDate).then((response) => {
            if (response.data.data === undefined) return;
            dispatch(initEmployeeCommutingData(response.data.data));
            setRerenderKey(rerenderKey + 1);
        });
    }, []);

    return (
        <><Toolbar />
            <div className='employee-travel'>
                {/* <div>
                    <CarbonDataTable headers={dataHeaders} data={employeeData} />
                </div> */}
                <div className='data-table'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} onClick={() => handleLinkClick(`/${index}`)}>
                                    <td>
                                        <input type="checkbox" onClick={handleStopPropagation}></input>
                                    </td>
                                    {row.map((item, itemIndex) => {
                                        return (
                                            <td key={itemIndex}>{item}</td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default connect((state) => {
    return {
        ...state.loginState,
        ...state.dataState,
        ...state.localDatabaseState
    }
})(EmployeeCommuting);