import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview, GetEmployeeOverviewDay } from 'Utilities/ApiServices.js';
import { initEmployeeCommutingData } from 'States/actions.js';
import Toolbar from 'Components/Toolbar.jsx';
import { TbDatabaseOff } from "react-icons/tb";

import './EmployeeCommuting.css';
import './Loader.css'


function EmployeeCommuting(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [rerenderKey, setRerenderKey] = useState(0);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    const dataHeaders = ['姓名', '員工編號', '交通工具', '公里數', '碳足跡-KG', '減少碳足跡'];

    const data = props.data.employeeCommuting.data;

    const handleRowClick = (index) => {
        navigate(`/employee-commuting/${data[index][1]}`);
    };

    const handleCheckboxClick = (event, index) => {
        event.stopPropagation();
        const newSelectedRows = new Set(selectedRows);
        if (event.target.checked) {
            newSelectedRows.add(index);
        } else {
            newSelectedRows.delete(index);
        }
        setSelectedRows(newSelectedRows);
    };

    const formatDate = (date) => {
        const padZero = (num) => num < 10 ? `0${num}` : num;
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        //tmp
        return `${2024}-${10}-${31}%2B08:00`;
        // return `${year}-${month}-${day}%2B08:00`;
    };

    const currentTime = new Date().getTime();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const endDate = formatDate(new Date(currentTime));
    const startDate = formatDate(oneMonthAgo);

    useEffect(() => {
        setIsLoading(true);
        if (Object.keys(data).length !== 0) {
            setIsLoading(false);
            return;
        }

        // GetEmployeeOverviewDay(props.token, "A001", endDate).then((response) => {
        //     // if (response.data.data === undefined) return;
        //     // dispatch(initEmployeeCommutingData(response.data.data));
        //     // setRerenderKey(rerenderKey + 1);
        // });
        GetEmployeeOverview(props.token, endDate).then((response) => {
            if (response.data.data === undefined) return;
            dispatch(initEmployeeCommutingData(response.data.data));
            setIsLoading(false);
            setRerenderKey(rerenderKey + 1);
        });
    }, []);

    if (isLoading) {
        return (
            <>
                <Toolbar />
                <div className="loader-container">
                    <div className='loader'>

                    </div>
                </div>
            </>
        );
    }

    // no data
    if (data.length === 0) {
        return (
            <>
                <Toolbar />
                <div className="no-data-container">
                    <div className="no-data-icon">
                        <TbDatabaseOff />
                    </div>
                    <div className='no-data'>
                        No data available
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Toolbar />
            <div className="employee-travel">
                <div className="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {dataHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(index, row)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(index)}
                                            onChange={(e) => handleCheckboxClick(e, index)}
                                        />
                                    </td>
                                    {row.map((item, itemIndex) => (
                                        <td key={itemIndex}>{item}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default connect((state) => ({
    ...state.loginState,
    ...state.dataState,
    ...state.localDatabaseState
}))(EmployeeCommuting);