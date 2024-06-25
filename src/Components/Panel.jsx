import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePageState } from 'States/actions.js';
import englishToChineseMap from 'Utilities/EnglishToChinese.js';
import { connect } from 'react-redux';

import './Panel.css';

function Panel(props) {
    const dispatch = useDispatch();
    const [focusedLink, setFocusedLink] = useState('/data-overview');

    const handleLinkClick = (link) => {
        setFocusedLink(link);
        const chinesePageState = englishToChineseMap[link.slice(1)];
        if (chinesePageState) {
            dispatch(changePageState(chinesePageState));
        }
    };

    return (
        <div className={`panel-container`}>
            <div to="/" className={`logo-text ${focusedLink === '/' ? 'focused' : ''}`}>
                <img className='panel-home' src='./images/GINTAN.png'></img>
            </div>
            {/* Rest of the code */}
            <div className={`panel-items`}>
                <Link to="/data-overview" className={`panel-item ${props.currentPage === '數據總覽' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/data-overview')}>
                    數據總覽
                </Link>
                <Link to="/carbon-footprint-data-overview" className={`panel-item  ${props.currentPage === '碳足跡數據總覽' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/carbon-footprint-data-overview')}>
                    碳足跡數據總覽
                </Link>
                <Link to="/commuting-carbon-footprint-data" className={`panel-item  ${props.currentPage === '通勤碳足跡數據' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/commuting-carbon-footprint-data')}>
                    通勤碳足跡數據
                </Link>
                <Link to="/transportation-carbon-footprint-data" className={`panel-item  ${props.currentPage === '運輸碳足跡數據' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/transportation-carbon-footprint-data')}>
                    運輸碳足跡數據
                </Link>
                <Link to="/current-usage-of-transportation-modes" className={`panel-item  ${props.currentPage === '交通工具使用現況' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/current-usage-of-transportation-modes')}>
                    交通工具使用現況
                </Link>
                <Link to="/current-usage-of-public-transportation" className={`panel-item  ${props.currentPage === '交通車使用現況' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/current-usage-of-public-transportation')}>
                    交通車使用現況
                </Link>
                <Link to="/accumulation-status" className={`panel-item  ${props.currentPage === '積點狀況' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/accumulation-status')}>
                    積點狀況
                </Link>
            </div>
            <div className='bottom-function-buttons'>
                <div className='bottom-function-button'>
                    上傳與修改資料
                </div>
                <div className='bottom-function-button'>
                    登入/ 登出
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
