import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import { connect, useDispatch } from 'react-redux';
import { GoTriangleRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';
import { englishToChineseMap } from 'Utilities/Auxiliary.js';
import { RiArrowDropRightFill } from "react-icons/ri";
import {  updateDepartmentList } from 'States/actions.js';
import { GetDepartment } from 'Utilities/ApiServices.js';


function Toolbar(props) {
    const dispatch = useDispatch();
    const hideAll = props.hideAll;
    const [timeSelectorToggle, setTimeSelectorToggle] = useState(false);
    const [department, setDepartment] = useState('');
    const [startTime, setStartTime] = useState('2024.10.01');
    const [endTime, setEndTime] = useState('2024.10.31');

    const [departmentList, setDepartmentList] = useState([]);
    const showVehicleTypeFilter = props.showVehicleTypeFilter;
    const vehicleTypeFilters = props.vehicleTypeFilters;

    // Get department list from server
    useEffect(() => {
        if (props.toolbar && props.toolbar.departmentList.length > 0) {
            setDepartmentList(props.toolbar.departmentList);
            return;
        }
        GetDepartment(props.token).then((response) => {
            if (response.data.code === 0) {
                dispatch(updateDepartmentList(response.data.data));
                setDepartmentList(response.data.data);
            } else {
                console.log('get department list error');
            }
        }).catch((error) => {
            console.error('Error GetDepartment:', error);
        });
    }, []);

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        if (props.handleDepartmentChange) props.handleDepartmentChange(event.target.value);
    };

    const handleTimeSelectorToggle = () => {
        setTimeSelectorToggle(!timeSelectorToggle);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value.split('-').join('.'));
        if(props.selectedDataRange) props.selectedDataRange(event.target.value, endTime.split('.').join('-'));
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value.split('-').join('.'));
        if(props.selectedDataRange) props.selectedDataRange(startTime.split('.').join('-'), event.target.value);
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

    // handle breadcrumbs
    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname.split('/').filter(part => part);
    const pathPartsLength = pathParts.length;
    const dateParts = pathParts[2] && pathParts[2].split('-');

    const handleRowClick = (index) => {
        let newPath = '';
        if (index === 0) {
            newPath = `/${pathParts[0]}`;
        } else if (index === 1) {
            const startTimeDate = startTime.split('.').join('-');
            const endTimeDate = endTime.split('.').join('-');
            newPath = `/${pathParts[0]}/${pathParts[1]}/${startTimeDate}/${endTimeDate}`;
        } else if (index === 2) {
            newPath = `/${pathParts[0]}/${pathParts[1]}/${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
        }
        navigate(newPath);
    };

    // vehicle type filter
    const handleVehicleTypeFilters = (e) => {
        const { name, checked } = e.target;
        props.handleVehicleTypeFilters(name, checked);
    };

    return (
        <div className='toolbar'>
            <div className='features'>
                <div
                    className='feature-blocks'
                    style={{
                        visibility: hideAll ? 'hidden' : 'visible',
                    }}>
                    <div className='main-features'>
                        <div className='feature-container'>
                            {/* <div className='feature-title'>部門</div> */}
                            <div className='department-selector'>
                                <select value={department} onChange={handleDepartmentChange}>
                                    <option value={''}>請選擇部門 </option>
                                    {departmentList.map((department, index) => (
                                        <option key={index} value={department.departmentName}>{department.departmentName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='feature-container'>
                            <div className="time-selector">
                                <div className="time-selector-text" onClick={handleTimeSelectorToggle}>
                                    <div className='time'>{startTime}</div>
                                    -
                                    <div className='time'>{endTime}</div>
                                    <div className={`arrow ${timeSelectorToggle ? 'toggle' : ''}`}><GoTriangleRight /></div>
                                    <div className='time-icon'>
                                        <FaRegCalendarAlt />
                                    </div>
                                </div>
                                {
                                    timeSelectorToggle && <div className="dropdown-menu">
                                        <div className="time-option">
                                            <label>起始時間:</label>
                                            <input
                                                className="start-time-selector"
                                                onChange={handleStartTimeChange}
                                                value={startTime.split('.').join('-')}
                                                type="date"
                                            />
                                        </div>
                                        <div className="time-option">
                                            <label>結束時間:</label>
                                            <input
                                                className="end-time-selector"
                                                onChange={handleEndTimeChange}
                                                value={endTime.split('.').join('-')}
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
                        <div className='sub-feature-container'
                            onClick={() => {
                                if (props.onClickExport) props.onClickExport();
                            }}
                        >
                            <div className='export'>匯出</div>
                        </div>
                        <div className='sub-feature-container'
                            onClick={() => {
                                if (props.onClickExportAll) props.onClickExportAll();
                            }}
                        >
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
                <div className='user-info'>
                    <div className='user-icon'>
                        <VscAccount />
                    </div>
                    {props.username}
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
            {/* 當前路徑 */}
            <div className='breadcrumbs'>
                {
                    pathPartsLength >= 1 && (
                        <div
                            className={`breadcrumb-text ${pathPartsLength !== 1 ? 'clickable' : ''}`}
                            onClick={() => pathPartsLength !== 1 && handleRowClick(0)}
                        >
                            {englishToChineseMap[pathParts[0]]}
                        </div>
                    )
                }
                {pathPartsLength > 1 && <RiArrowDropRightFill />}
                {
                    pathPartsLength >= 2 && (
                        <div
                            className={`breadcrumb-text ${pathPartsLength !== 2 && pathPartsLength < 4 ? 'clickable' : ''}`}
                            onClick={() => pathPartsLength !== 2 && handleRowClick(1)}
                        >
                            {pathParts[1]}
                        </div>
                    )
                }
                {pathPartsLength > 2 && pathPartsLength < 4 && <RiArrowDropRightFill />}
                {
                    pathPartsLength === 3 && (
                        <div
                            className={`breadcrumb-text ${pathPartsLength !== 3 ? 'clickable' : ''}`}
                            onClick={() => pathPartsLength !== 3 && handleRowClick(2)}
                        >
                            {`${dateParts[0]} 年 ${dateParts[1]} 月 ${dateParts[2]} 日 `}
                        </div>
                    )
                }
            </div>


        </div>
    );
};

export default connect((state) => {
    return {
        ...state.loginState,
        ...state.localDatabaseState
    }
})(Toolbar);