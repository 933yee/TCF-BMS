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
                <Link to="/employee-travel" className={`panel-item  ${props.currentPage === '員工差旅' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/employee-travel')}>
                    員工差旅
                </Link>
                <Link to="/upstream-transportation" className={`panel-item  ${props.currentPage === '上游運輸' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/upstream-transportation')}>
                    上游運輸
                </Link>
                <Link to="/downstream-transportation" className={`panel-item  ${props.currentPage === '下游運輸' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/downstream-transportation')}>
                    下游運輸
                </Link>
                <Link to="/employee-commuting" className={`panel-item  ${props.currentPage === '員工通勤' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/employee-commuting')}>
                    員工通勤
                </Link>
                <Link to="/official-vehicle" className={`panel-item  ${props.currentPage === '公務車' ? 'focused' : 'not-focused'}`} onClick={() => handleLinkClick('/official-vehicle')}>
                    公務車
                </Link>
            </div>
            <div className='bottom-function-buttons'>
                <Link to="/upload-and-modify-data" className='bottom-function-button' onClick={() => handleLinkClick('/upload-and-modify-data')}>
                    上傳與修改資料
                </Link>
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
