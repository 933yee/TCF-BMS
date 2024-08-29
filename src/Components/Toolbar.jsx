import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import { connect } from 'react-redux';
import { GoTriangleRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";

function Toolbar(props) {
    const [timeSelectorToggle, setTimeSelectorToggle] = useState(false);
    const [department, setDepartment] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const departmentList = props.toolbar.departmentList;
    const showVehicleTypeFilter = props.showVehicleTypeFilter;
    const vehicleTypeFilters = props.vehicleTypeFilters;

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        if (props.handleDepartmentChange) props.handleDepartmentChange(event.target.value);
    };

    const handleTimeSelectorToggle = () => {
        setTimeSelectorToggle(!timeSelectorToggle);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const handleClickOutside = (event) => {
        const timeSelector = document.querySelector('.time-selector');
        if (timeSelector && !timeSelector.contains(event.target)) {
            setTimeSelectorToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // vehicle type filter
    const handleVehicleTypeFilters = (e) => {
        const { name, checked } = e.target;
        props.handleVehicleTypeFilters(name, checked);
    };

    return (
        <div className='toolbar'>
            <div className='features'>
                <div className='feature-blocks'>
                    <div className='main-features'>
                        <div className='feature-container'>
                            {/* <div className='feature-title'>部門</div> */}
                            <div className='department-selector'>
                                <select value={department} onChange={handleDepartmentChange}>
                                    <option value={''}>請選擇部門 </option>
                                    {departmentList.map((department, index) => (
                                        <option key={index} value={department}>{department}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='feature-container'>
                            <div className="time-selector">
                                <div className="time-selector-text" onClick={handleTimeSelectorToggle}>
                                    時間搜尋
                                    <div className={`arrow ${timeSelectorToggle ? 'toggle' : ''}`}><GoTriangleRight /></div>
                                </div>
                                {
                                    timeSelectorToggle && <div className="dropdown-menu">
                                        <div className="time-option">
                                            <label>起始時間:</label>
                                            <input
                                                className="start-time-selector"
                                                onChange={handleStartTimeChange}
                                                value={startTime}
                                                type="date"
                                            />
                                        </div>
                                        <div className="time-option">
                                            <label>結束時間:</label>
                                            <input
                                                className="end-time-selector"
                                                onChange={handleEndTimeChange}
                                                value={endTime}
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='sub-features'>
                        <div className='sub-feature-container'>
                            <div className='map-show'>地圖顯示</div>
                        </div>
                        <div className='sub-feature-container'>
                            <div className='export'>匯出</div>
                        </div>
                        <div className='sub-feature-container'>
                            <div className='export-all'>一鍵匯出</div>
                        </div>
                        {
                            props.showAddVehicleButton &&
                            <div className='sub-feature-container'>
                                <div className='add-new-data'
                                    onClick={() => {
                                        if (props.onClickAddVehicle) props.onClickAddVehicle();
                                    }}
                                >新增運具</div>
                            </div>
                        }
                        <div className='sub-feature-container'>
                            <div className='add-new-data'
                                onClick={() => {
                                    if (props.onClickAddData) props.onClickAddData();
                                }}
                            >新增資料</div>
                        </div>
                        <div className='sub-feature-container'>
                            <div className='delete-data'
                                onClick={() => {
                                    if (props.onClickDeleteData) props.onClickDeleteData();
                                }}
                            >刪除</div>
                        </div>
                        <div className='sub-feature-container'>
                            <div className='search-keyword'>
                                <input
                                    className='search-keyword-input'
                                    type="text"
                                    placeholder="搜尋關鍵字"
                                ></input>
                                <FaSearch />
                            </div>
                        </div>
                    </div>
                </div>
                {showVehicleTypeFilter && <div className='vehicle-type-filter'>
                    <label>
                        <input
                            type="checkbox"
                            name="貨物長途運輸"
                            onChange={handleVehicleTypeFilters}
                            checked={vehicleTypeFilters["貨物長途運輸"]}
                        />
                        貨物長途運輸
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="人員運輸"
                            onChange={handleVehicleTypeFilters}
                            checked={vehicleTypeFilters["人員運輸"]}
                        />
                        人員運輸
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="貨物廠區運輸"
                            onChange={handleVehicleTypeFilters}
                            checked={vehicleTypeFilters["貨物廠區運輸"]}
                        />
                        貨物廠區運輸
                    </label>
                </div>}
            </div>
        </div>
    );
};

export default connect((state) => {
    return {
        ...state.localDatabaseState
    }
})(Toolbar);