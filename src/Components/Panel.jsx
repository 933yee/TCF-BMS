import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeCurrentPage } from 'States/actions.js';
import { englishToChineseMap } from 'Utilities/Auxiliary.js';
import { connect } from 'react-redux';

import './Panel.css';

function Panel(props) {
    const dispatch = useDispatch();
    const currentPathname = window.location.pathname;

    const handleLinkClick = (link) => {
        dispatch(changeCurrentPage(link));
    };

    return (
        <div className={`panel-container`}>
            <div to="/" className={`logo-text`}>
                <img className='panel-home' src={`${window.location.origin}/images/GINTAN.png`}></img>
            </div>
            {/* Rest of the code */}
            <div className={`panel-items`}>
                <Link to="/data-overview" className={`panel-item ${currentPathname === '/data-overview' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/data-overview')}>
                    數據總覽
                </Link>
                <Link to="/employee-travel" className={`panel-item  
                    ${currentPathname.split('/')[1] === 'employee-travel' ? 'focused' : 'not-focused'}`}
                    onClick={() => handleLinkClick('/employee-travel')}
                >
                    員工差旅
                </Link>
                {/* <Link to="/upstream-transportation" className={`panel-item  ${props.currentPage === '上游運輸' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/upstream-transportation')}> */}
                {/* 上游運輸 */}
                {/* </Link> */}
                {/* <Link to="/downstream-transportation" className={`panel-item  ${props.currentPage === '下游運輸' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/downstream-transportation')}> */}
                {/* 下游運輸 */}
                {/* </Link> */}
                <Link to="/employee-commuting" className={`panel-item  ${currentPathname === '/employee-commuting' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/employee-commuting')}>
                    員工通勤
                </Link>
                <Link to="/mobile-source-emissions" className={`panel-item  
                    ${currentPathname.split('/')[1] === 'mobile-source-emissions' ? 'focused' : 'not-focused'}`}
                    onClick={() => handleLinkClick('/mobile-source-emissions')}
                >
                    移動源排放
                </Link>
            </div>
            <div className='bottom-function-buttons'>
                <Link to="/vehicle-data" className={`bottom-function-button vehicle-data-button ${currentPathname === '/vehicle-data' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/vehicle-data')}>
                    車輛資料
                </Link>
                <Link to="/employee-data" className={`bottom-function-button employee-data-button ${currentPathname === '/employee-data' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/employee-data')}>
                    員工資料
                </Link>
                <div className={`bottom-function-button logout-button`}
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('account');
                        window.location.href = '/login'
                    }}
                >
                    登出
                </div>
            </div>
        </div >
    );
}

export default connect((state) => {
    return {
        ...state.pageState
    }
})(Panel);
