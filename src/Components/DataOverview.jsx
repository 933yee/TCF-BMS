import React, { useState } from 'react';
import {
    changeDepartment,
    changeUnit,
    changeStartTime,
    changeEndTime,
    changePageState,
} from 'States/actions.js';

import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './DataOverview.css';

function DataOverview(props) {
    const dispatch = useDispatch();

    const handleLinkClick = (page) => {
        dispatch(changePageState(page));
    }

    const handleDepartmentChange = (event) => {
        dispatch(changeDepartment(event.target.value));
    };
    const handleUnitChange = (event) => {
        dispatch(changeUnit(event.target.value));
    };
    const handleStartTimeChange = (event) => {
        dispatch(changeStartTime(event.target.value));
    };

    const handleEndTimeChange = (event) => {
        dispatch(changeEndTime(event.target.value));
    };

    return (
        <div className='data-overview'>
            <div className='features'>
                <div className='feature-blocks'>
                    <div className='feature-container'>
                        <div className='feature-title'>部門</div>
                        <select className='feature-block' value={props.department} onChange={handleDepartmentChange}>
                            <option value={''}>請選擇部門 </option>
                            <option>Department 1</option>
                            <option >Department 2</option>
                            <option>Department 3</option>
                        </select>
                    </div>
                    <div className='feature-container'>
                        <div className='feature-title'>碳足跡單位</div>
                        <select className='feature-block' value={props.unit} onChange={handleUnitChange}>
                            <option value={''}>請選擇單位 </option>
                            <option>單位 1</option>
                            <option>單位 2</option>
                        </select>
                    </div>
                    <div className='feature-container'>
                        <div className='feature-title'>起始時間</div>
                        <input
                            className='feature-block'
                            type='date'
                            onChange={handleStartTimeChange}
                            value={props.startTime}
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div className='feature-container'>
                        <div className='feature-title'>結束時間</div>
                        <input
                            className='feature-block'
                            type='date'
                            onChange={handleEndTimeChange}
                            value={props.endTime}
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
            </div>
            {/* <div className='search-block'>
                <div className='search-button'>
                    Search
                </div>
            </div> */}
            <div className='details'>
                <div className='detail-blocks'>
                    <Link to="/carbon-footprint-data-overview" className='detail-block' onClick={() => handleLinkClick('碳足跡數據總覽')}>
                        <div className='detail-title'>
                            碳足跡數據總覽
                        </div>
                        <div className='detail-carbon-footprint-data-overview'>
                        </div>
                    </Link>
                    <Link to="/commuting-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('通勤碳足跡數據')}>
                        <div className='detail-title'>
                            通勤碳足跡數據
                        </div>
                        <div className='detail-commuting-carbon-footprint-data'>
                        </div>
                    </Link>
                    <Link to="/transportation-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('運輸碳足跡數據')}>
                        <div className='detail-title'>
                            運輸碳足跡數據
                        </div>
                        <div className='detail-transportation-carbon-footprint-data'>
                        </div>
                    </Link>
                    <Link to="/current-usage-of-transportation-modes" className='detail-block' onClick={() => handleLinkClick('交通工具使用現況')}>
                        <div className='detail-title'>
                            交通工具使用現況
                        </div>
                        <div className='detail-current-usage-of-transportation-modes'>
                        </div>
                    </Link>
                    <Link to="/current-usage-of-public-transportation" className='detail-block' onClick={() => handleLinkClick('交通車使用現況')}>
                        <div className='detail-title'>
                            交通車使用現況
                        </div>
                        <div className='detail-current-usage-of-public-transportation'>
                        </div>
                    </Link>
                    <Link to="/accumulation-status" className='detail-block' onClick={() => handleLinkClick('積點狀況')}>
                        <div className='detail-title'>
                            積點狀況
                        </div>
                        <div className='detail-accumulation-status'>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default connect((state) => {
    return {
        ...state.searchParams
    }
})(DataOverview);