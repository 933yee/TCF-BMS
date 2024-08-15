import React, { useState, useEffect } from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { IoIosClose } from "react-icons/io";
import Toolbar from 'Components/Toolbar.jsx';
import { addVehicleData, deleteVehicleData, updateVehicleBindData } from 'States/actions.js';

import './AddDataForm.css';
import { connect, useDispatch } from 'react-redux';

function VehicleData(props) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rerenderKey, setRerenderKey] = useState(0);
    const dataHeaders = [
        '車牌號碼', '交通工具', '交通工具種類', '員工', '員工編號', '部門',
    ];

    const vehicles = [
        "低地板甲類市區公車運輸服務(包含營業據點及公車站點排放)",
        "乙類市區公車運輸服務(包含營業據點及公車站點排放)",
        "普通甲類市區公車運輸服務(包含營業據點及公車站點排放)",
        "營業大客車(市區公車及公路客運-柴油)",
        "自用大客車(柴油)",
        "營業大貨車(柴油)",
        "營業小貨車(柴油)",
        "營業小貨車(汽油)",
        "自用大貨車(柴油)",
        "自用小貨車(柴油)",
        "自用小貨車(汽油)",
        "營業小貨車(汽油)",
        "營業小貨車(柴油)",
        "營業大貨車(柴油)",
        "3.49噸低溫貨車服務(裝載率32％，包含營業據點排放)",
        "3.49噸低溫貨車服務(裝載率77％，包含營業據點排放)",
        "3.5~7.4噸低溫貨車服務(裝載率41％，包含營業據點排放)",
        "3.5~7.4噸低溫貨車服務(裝載率69％，包含營業據點排放)",
        "3.49噸多溫貨車服務(包含營業據點排放)",
        "營業遊覽車(柴油)",
        "自用小客車(汽油)",
        "營業小客車(汽油)",
        "機器腳踏車(汽油)",
        "以柴油動力垃圾車清除運輸一般廢棄物"
    ]

    const vehicleTypes = [
        "貨物長途運輸",
        "人員運輸",
        "貨物廠區運輸"
    ]

    // selected rows
    const [selectedRows, setSelectedRows] = useState(props.data.vehicleData.data.map(() => false));
    const handleSelectedRowsChange = (index) => {
        const newSelectedRows = selectedRows;
        newSelectedRows[index] = !newSelectedRows[index];
        setSelectedRows(newSelectedRows);
        setRerenderKey(rerenderKey + 1);
    }

    // delete button clicked
    const onClickDeleteData = () => {
        dispatch(deleteVehicleData(selectedRows));
        const initSelectedRows = [];
        props.data.vehicleData.data.map((row, index) => {
            initSelectedRows.push(false);
        });
        setSelectedRows(initSelectedRows);
        setRerenderKey(rerenderKey + 1);
    }

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const onClickAddData = () => {
        setShowModal(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = [
            event.target.elements.license.value,
            event.target.elements.vehicle.value,
            event.target.elements.vehicleType.value,
            '',
            '',
            '',
        ]
        dispatch(addVehicleData(newData));

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDropdownChange = (event, index) => {
        // const newMatchEmployee = [...matchEmployee];
        // newMatchEmployee[index] = event.target.value;
        // setMatchEmployee(newMatchEmployee);
        const license = props.data.vehicleData.data[index][0];
        const employeeName = event.target.value;
        const employeeCode = employeeName != '' ? props.data.employeeData.data.find((data) => data[0] === employeeName)[1] : '';
        dispatch(updateVehicleBindData([license, employeeCode]));
        setRerenderKey(prevKey => prevKey + 1);
    }

    return (
        <> <Toolbar onClickAddData={onClickAddData} onClickDeleteData={onClickDeleteData} />
            <div className='employee-travel add-data-form'>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content-container">
                            <div className='close-button' onClick={handleCloseModal}>
                                <IoIosClose />
                            </div>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <h2>新增資料</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className='title'>車牌號碼</label>
                                        <input type="text" className='textfield' name='license' />
                                    </div>
                                    <div className="form-group">
                                        <label className='title'>交通工具</label>
                                        <select name='vehicle'>
                                            <option></option>
                                            {vehicles.map((vehicle, index) => (
                                                <option key={index}>{vehicle}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className='title'>交通工具種類</label>
                                        <select name='vehicleType'>
                                            <option></option>
                                            {vehicleTypes.map((vehicleType, index) => (
                                                <option key={index}>{vehicleType}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='submit-button-container'>
                                        <button
                                            type="submit"
                                            className='submit-button'
                                        >
                                            提交資料
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )
                }
                <div>
                </div>
                <div className='data-table'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {dataHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody key={rerenderKey}>
                            {props.data.vehicleData.data.map((row, index) => {
                                const license = row[0];
                                const vehicle = row[1];
                                const vehicleType = row[2];
                                const employeeCode = props.data.vehicleData.vehicleBindEmployee[license];
                                const employee = employeeCode !== undefined ? props.data.employeeData.searchEmployeeCode[employeeCode] : '';
                                const employeeName = employee !== undefined ? employee[0] : '';
                                const employeeDepartment = employee !== undefined ? employee[1] : '';
                                return (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onClick={handleStopPropagation}
                                                onChange={() => handleSelectedRowsChange(index)}
                                                checked={selectedRows[index]}
                                            ></input>
                                        </td>
                                        <td>{license}</td>
                                        <td>{vehicle} </td>
                                        <td>{vehicleType} </td>
                                        <td>
                                            <select
                                                onClick={handleStopPropagation}
                                                onChange={(e) => handleDropdownChange(e, index)}
                                                value={employeeName}
                                            >
                                                <option>
                                                </option>
                                                {
                                                    props.data.employeeData.data.map((option, optionIndex) => (
                                                        <option value={option[0]} key={optionIndex}>
                                                            {option[0]}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td>
                                            {employeeCode}
                                        </td>
                                        <td>
                                            {employeeDepartment}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {/* {
            isDetail !== true && (
                <Routes>
                    {data.map((row, index) => (
                        <Route key={index} path={`/${index}`} element={
                            <CarbonDataTable headers={headers} data={dataDetail[index]} isDetail={true} />
                        } />
                    ))}
                </Routes>
            )
        } */}
                </div>
            </div >
        </>
    );
}
export default connect((state) => {
    return {
        ...state.loginState,
        ...state.dataState,
        ...state.localDatabaseState
    }
})(VehicleData);



