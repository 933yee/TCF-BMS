import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview, GetEmployeeOverviewDay } from 'Utilities/ApiServices.js';
import { initEmployeeCommutingDataDetail } from 'States/actions.js';
import Toolbar from 'Components/Toolbar.jsx';
import './Loader.css'
import { TbDatabaseOff } from "react-icons/tb";


function EmployeeCommutingDetail(props) {
    const { employeeCode } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [rerenderKey, setRerenderKey] = useState(0);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const dataHeaders = ['交通工具', '起始地', '抵達地', '公里數', '碳足跡-KG'];

    const handleRowClick = (index) => { };

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
        GetEmployeeOverviewDay(props.token, employeeCode, endDate).then((response) => {
            if (response.data.data === undefined) {
                setIsLoading(false);
                return;
            }
            setData(
                response.data.data.transportInfo.map((item) => [
                    item.transportationType,
                    `${item.start.lat}, ${item.start.lon}`,
                    `${item.end.lat}, ${item.end.lon}`,
                    item.distance,
                    item.carbon
                ])
            );
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
}))(EmployeeCommutingDetail);