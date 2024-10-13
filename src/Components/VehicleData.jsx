import React, { useState, useEffect } from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { IoIosClose } from "react-icons/io";
import Toolbar from 'Components/Toolbar.jsx';
import { addVehicleData, deleteVehicleData, updateVehicleData, updateVehicleBindData } from 'States/actions.js';

import './AddDataForm.css';
import './VehicleData.css';
import { connect, useDispatch } from 'react-redux';

function VehicleData(props) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showAddData, setShowAddData] = useState(false);
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    const [rerenderKey, setRerenderKey] = useState(0);
    const dataHeaders = [
        '車牌號碼', '交通工具', '交通工具目的', '員工', '員工編號', '部門',
    ];

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

    // add vehicle button clicked
    const onClickAddVehicle = () => {
        setShowModal(true);
        setShowAddVehicle(true);
    }

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const onClickAddData = () => {
        setShowModal(true);
        setShowAddData(true);
    }

    const handleSubmitAddVehicleData = (event) => {
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
        handleCloseModal();
    }

    const handleSubmitAddVehicle = (event) => {
        event.preventDefault();
        setAddVehiclePage(false);
        const newVehicle = event.target.elements['new-vehicle-name'].value;
        const newCarbonCoefficient = event.target.elements['carbon-coefficient'].value;
        const newCarbonCoefficientUnit = event.target.elements['vehicle'].value;
        const newVehicleData = { ...props.data.vehicleData.vehicles };
        newVehicleData[newVehicle] = [newCarbonCoefficient, newCarbonCoefficientUnit];
        dispatch(updateVehicleData(newVehicleData));
        // clear textfield
        event.target.elements['new-vehicle-name'].value = '';
        event.target.elements['carbon-coefficient'].value = '';
        event.target.elements['vehicle'].value = '';
    }

    const handleCancelAddVehicle = () => {
        setAddVehiclePage(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setShowAddData(false);
        setShowAddVehicle(false);
        setAddVehiclePage(false);
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

    // Edit Vehicle Type Data
    const [selectedItems, setSelectedItems] = useState([]);
    const [addVehiclePage, setAddVehiclePage] = useState(false);


    const handleCheckboxChange = (index) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(index)
                ? prevSelectedItems.filter((i) => i !== index)
                : [...prevSelectedItems, index]
        );
    };

    const handleDeleteSelected = () => {
        const newVehicleData = { ...props.data.vehicleData.vehicles };
        selectedItems.forEach((index) => {
            delete newVehicleData[Object.keys(newVehicleData)[index]];
        });
        dispatch(updateVehicleData(newVehicleData));
        setSelectedItems([]);
    };

    const handleAddVehicle = () => {
        setAddVehiclePage(true);

    }   // Add Vehicle Data

    return (
        <div className='vehicle-data'>
            <Toolbar
                onClickAddData={onClickAddData}
                onClickDeleteData={onClickDeleteData}
                onClickAddVehicle={onClickAddVehicle}
                showAddVehicleButton={true}
            />
            <div className='employee-travel add-data-form'>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content-container">
                            <div className='close-button' onClick={handleCloseModal}>
                                <IoIosClose />
                            </div>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                {
                                    showAddData && (
                                        <>
                                            <h2>新增資料</h2>

                                            <form onSubmit={handleSubmitAddVehicleData}>
                                                <div className="form-group">
                                                    <label className='title'>車牌號碼</label>
                                                    <input type="text" className='textfield' name='license' />
                                                </div>
                                                <div className="form-group">
                                                    <label className='title'>交通工具</label>
                                                    <select name='vehicle'>
                                                        <option></option>
                                                        {Object.keys(props.data.vehicleData.vehicles).map((vehicle, index) => (
                                                            <option key={index}>{vehicle}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label className='title'>運具碳排係數</label>
                                                    <input type="text" className='textfield' name='carbon-coefficient' />
                                                </div> */}
                                                <div className="form-group">
                                                    <label className='title'>交通工具目的</label>
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
                                        </>
                                    )
                                }
                                {
                                    showAddVehicle && (
                                        <div className={`vehicle-form ${addVehiclePage ? 'add-form' : ''}`}>
                                            <div className={`edit-vehicle-container`}>
                                                <h2>編輯交通工具種類</h2>

                                                <form>
                                                    <div className='edit-vehicle-form'>
                                                        <table className='vehicle-table'>
                                                            <tbody>
                                                                {Object.keys(props.data.vehicleData.vehicles).map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedItems.includes(index)}
                                                                                onChange={() => handleCheckboxChange(index)}
                                                                            />
                                                                        </td>
                                                                        <td>{item}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className='edit-vehicle-button'>
                                                        <button
                                                            type="button"
                                                            onClick={handleDeleteSelected}
                                                            className='delete-vehicle-button'
                                                            disabled={selectedItems.length === 0}
                                                        >
                                                            刪除種類
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleAddVehicle}
                                                            className='add-vehicle-button'
                                                        >
                                                            新增種類
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className='add-vehicle-form'>
                                                <h2>新增資料</h2>

                                                <form onSubmit={handleSubmitAddVehicle}>
                                                    <div className="form-group">
                                                        <label className='title'>輸入欲增加的交通工具</label>
                                                        <input type="text" className='textfield' name='new-vehicle-name' />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='title'>輸入碳排係數</label>
                                                        <input type="text" className='textfield' name='carbon-coefficient' />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='title' name='carbon-coefficient-unit'>碳排係數單位</label>
                                                        <select name='vehicle'>
                                                            <option></option>
                                                            <option>延人公里</option>
                                                            <option>延頓公里</option>
                                                        </select>
                                                    </div>
                                                    <div className='button-container'>
                                                        <button
                                                            className='cancel-button'
                                                            onClick={handleCancelAddVehicle}
                                                            type='button'
                                                        >
                                                            取消
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className='submit-button'
                                                        >
                                                            確認
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                }
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
        </div>
    );
}
export default connect((state) => {
    return {
        ...state.loginState,
        ...state.dataState,
        ...state.localDatabaseState
    }
})(VehicleData);



