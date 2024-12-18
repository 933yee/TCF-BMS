import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview, GetEmployeeOverviewDay, GetReverse } from 'Utilities/ApiServices.js';
import { initEmployeeCommutingDataDetail } from 'States/actions.js';
import { typeToChineseMap } from 'Utilities/Auxiliary.js';

import Toolbar from 'Components/Toolbar.jsx';
import './Loader.css'
import { TbDatabaseOff } from "react-icons/tb";


function EmployeeCommutingDetail(props) {
    const { employeeCode, date } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [rerenderKey, setRerenderKey] = useState(0);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const dataHeaders = ['交通工具', '起始時間', '結束時間', '起始地', '抵達地', '精準度', '公里數', '碳足跡-KG'];

    const handleRowClick = (index) => { };

    const onClickAddData = () => {
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

    useEffect(() => {
        setIsLoading(true);
        GetEmployeeOverviewDay(props.token, employeeCode, date, date).then((response) => {
            if (response.data.data === undefined) {
                setIsLoading(false);
                return;
            }
            if (response.data.data.dayOverviews.length != 0) {
                const initialData = response.data.data.dayOverviews[0].transportInfo.map((item) => {
                    const startDate = new Date(item.start.time);
                    const formattedStartTime = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')} ${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;
                    const endDate = new Date(item.end.time);
                    const formattedEndTime = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')} ${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
                    return [
                        `${typeToChineseMap[item.transportationType]}`,
                        formattedStartTime,
                        formattedEndTime,
                        `${item.start.addr}`,
                        `${item.end.addr}`,
                        item.accuracy,
                        item.distance / 1000,
                        item.carbon / 1000,
                    ];
                });
                setData(initialData);
            }

            // response.data.data.transportInfo.forEach((item, index) => {
            //     GetReverse(props.token, item.start.lat, item.start.lon).then((startAddressResponse) => {
            //         const startData = startAddressResponse.data;
            //         const startLocation = startData?.name || `${startData?.address?.city || ''} ${startData?.address?.street || ''}`;
            //         console.log(startLocation);
            //         setData((prevData) => {
            //             const updatedData = [...prevData];
            //             updatedData[index][3] = startLocation;
            //             return updatedData;
            //         });
            //     });

            //     GetReverse(props.token, item.end.lat, item.end.lon).then((endAddressResponse) => {
            //         const endData = endAddressResponse.data;
            //         const endLocation = endData?.name || `${endData?.address?.city || ''} ${endData?.address?.street || ''}`;
            //         console.log(endLocation);
            //         setData((prevData) => {
            //             const updatedData = [...prevData];
            //             updatedData[index][4] = endLocation;
            //             return updatedData;
            //         });
            //     });
            // });

            setIsLoading(false);
            setRerenderKey((prev) => prev + 1);
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
            <div className="employee-commuting">
                <div className="data-table hidden">
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