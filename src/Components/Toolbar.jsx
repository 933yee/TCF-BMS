import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import { connect } from 'react-redux';
import { GoTriangleRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";

function Toolbar(props) {
    const onClickAddData = props.onClickAddData;
    const [timeSelectorToggle, setTimeSelectorToggle] = useState(false);
    const [department, setDepartment] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
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
                                    <option>Department 1</option>
                                    <option >Department 2</option>
                                    <option>Department 3</option>
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
                        <div className='sub-feature-container'>
                            <div className='add-new-data'
                                onClick={() => {
                                    if (onClickAddData) onClickAddData();
                                }}
                            >新增資料</div>
                        </div>
                        <div className='sub-feature-container'>
                            <div className='delete-data'>刪除</div>
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
            </div>
        </div>
    );
};

export default Toolbar;
