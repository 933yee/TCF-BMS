import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { GetEmployeeOverview, GetEmployeeOverviewDay } from 'Utilities/ApiServices.js';
import { initEmployeeCommutingData } from 'States/actions.js';
import Toolbar from 'Components/Toolbar.jsx';
import { TbDatabaseOff } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";

import './EmployeeCommuting.css';
import './Loader.css'
import './AddDataForm.css';


function EmployeeCommuting(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [rerenderKey, setRerenderKey] = useState(0);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    const dataHeaders = ['姓名', '部門', '員工編號', '上班天數', '公里數', '碳足跡-KG', '減少碳足跡'];
    const data = props.data.employeeCommuting.data;

    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleDepartmentChange = (department) => {
        setSelectedRows(new Set());
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
        if (department === "請選擇部門") department = '';
        setSelectedDepartment(department);
    };

    const downloadFile = (content, fileName, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const convertToCSV = (data) => {
        const rows = data.map(item => Object.values(item).join(','));
        return '\uFEFF' + [dataHeaders.join(','), ...rows].join('\n');
    };

    const onClickExport = () => {
        if (selectedRows.size === 0) return;
        const csvContent = convertToCSV(filterData(data).filter((row, index) => selectedRows.has(index)));
        downloadFile(csvContent, 'exported_data.csv', 'text/csv');
    };

    const onClickExportAll = () => {
        const csvContent = convertToCSV(filterData(data));
        downloadFile(csvContent, 'exported_data.csv', 'text/csv');
    };

    const handleRowClick = (index) => {
        navigate(`/employee-commuting/${data[index][2]}/${startDate}/${endDate}`);
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

    // default date range
    const [startDate, setStartDate] = useState("2024-10-01");
    const [endDate, setEndDate] = useState("2024-10-31");

    useEffect(() => {
        setIsLoading(true);
        if (Object.keys(data).length !== 0) {
            setIsLoading(false);
            return;
        }
        GetEmployeeOverview(props.token, startDate, endDate).then((response) => {
            if (response.data.data === undefined) return;
            dispatch(initEmployeeCommutingData(response.data.data));
            setIsLoading(false);
            setRerenderKey(rerenderKey + 1);
        });
    }, []);

    // Serach Data in the range of selected date    
    const selectedDataRange = async (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setIsLoading(true);
        GetEmployeeOverview(props.token, startDate, endDate).then((response) => {
            if (response.data.data === undefined) return;
            dispatch(initEmployeeCommutingData(response.data.data));
            setIsLoading(false);
            setRerenderKey(rerenderKey + 1);
        });
    }
        
    const filterData = (data) => {
        if (selectedDepartment === '') return data;
        data = data.filter((row) => row[1] === selectedDepartment);
        return data;
    }

    const onClickAddData = () => {
        setShowModal(true);
        setShowAddData(true);
    }
    const [showModal, setShowModal] = useState(false);
    const [showAddData, setShowAddData] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
        setShowAddData(false);
    }

    const handleSubmitAddData = (e) => {
    }

    if (isLoading) {
        return (
            <>
                <Toolbar
                    handleDepartmentChange={handleDepartmentChange}
                />
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
                <Toolbar
                    handleDepartmentChange={handleDepartmentChange}
                />
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
            <Toolbar
                selectedDataRange={selectedDataRange}
                onClickExportAll={onClickExportAll}
                handleDepartmentChange={handleDepartmentChange}
                onClickExport={onClickExport}
                onClickAddData={onClickAddData}
            />
            <div className='add-data-form'>
                {showModal && <div className="modal-overlay">
                    <div className="modal-content-container">
                        <div className='close-button' onClick={handleCloseModal}>
                            <IoIosClose />
                        </div>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {
                                showAddData && (
                                    <>
                                        <h2>新增資料</h2>

                                        <form onSubmit={handleSubmitAddData}>
                                            <div className="form-group">
                                                <label className='title'>日期</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>時間</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>出發地</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>抵達地</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>員工編號</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>交通工具</label>
                                                <select name='vehicle'>
                                                    <option></option>
                                                    {Object.keys(props.data.employeeCommuting.vehicles).map((vehicle, index) => (
                                                        <option key={index}>{vehicle}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>里程數</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>交通金額</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>出差事由</label>
                                                <input type="text" className='textfield' name='license' />
                                            </div>
                                            <div className="form-group">
                                                <label className='title'>照片上傳</label>
                                                <input type="file" className='textfield' name='photoUpload' accept="image/*" />
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
                        </div>
                    </div>
                </div >
                }
            </div>
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
                            {filterData(data).map((row, index) => (
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