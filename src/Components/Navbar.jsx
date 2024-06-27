import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { connect, useDispatch } from 'react-redux';
import chineseToEnglishMap from 'Utilities/ChinsesToEnglish.js';
import { changeCurrentPage, deletePage } from 'States/actions.js';

import './Navbar.css';

function Navbar(props) {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (page) => {
        dispatch(changeCurrentPage(page));
    }
    const handleDeletePage = (page) => {
        dispatch(deletePage(page));
    }

    return (
        <div className='navbar-container'>
            {props.pages.map((page, index) => (
                <div key={index} className={`page ${props.currentPage === page ? 'highlight' : ''}`} >
                    <Link to={`/${chineseToEnglishMap[page]}`} className='page-text' onClick={() => handleLinkClick(page)}>
                        {page}
                    </Link>
                    {page === '數據總覽' ? '' :
                        (
                            <div className='page-delete-button' onClick={() => handleDeletePage(page)}>
                                <RxCross1 />
                            </div>
                        )
                    }
                </div>
            ))}
            {/* <img className='logo' src='./images/ECHO_TCF.png' alt='ECHO_TCF'></img>
            <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                <div className={`menu-toggle-hamburger-top ${isOpen ? 'toggle' : ''}`}></div>
                <div className={`menu-toggle-hamburger-mid ${isOpen ? 'toggle' : ''}`}></div>
                <div className={`menu-toggle-hamburger-bot ${isOpen ? 'toggle' : ''}`}></div>
            </div> */}
            {/* <div className={`nav-items ${isOpen ? 'show' : ''}`}>
                <Link to="/data-overview" className={`nav-item ${props.currentPage === '數據總覽' ? 'highlight' : ''}`} onClick={() => handleLinkClick('數據總覽')}>數據總覽</Link>
                <Link to="/carbon-footprint-data-overview" className={`nav-item ${props.currentPage === '碳足跡數據總覽' ? 'highlight' : ''}`} onClick={() => handleLinkClick('碳足跡數據總覽')}>碳足跡數據總覽</Link>
                <Link to="/commuting-carbon-footprint-data" className={`nav-item ${props.currentPage === '通勤碳足跡數據' ? 'highlight' : ''}`} onClick={() => handleLinkClick('通勤碳足跡數據')}>通勤碳足跡數據</Link>
                <Link to="/transportation-carbon-footprint-data" className={`nav-item ${props.currentPage === '運輸碳足跡數據' ? 'highlight' : ''}`} onClick={() => handleLinkClick('運輸碳足跡數據')}>運輸碳足跡數據</Link>
                <Link to="/current-usage-of-transportation-modes" className={`nav-item ${props.currentPage === '交通工具使用現況' ? 'highlight' : ''}`} onClick={() => handleLinkClick('交通工具使用現況')}>交通工具使用現況</Link>
                <Link to="/current-usage-of-public-transportation" className={`nav-item ${props.currentPage === '交通車使用現況' ? 'highlight' : ''}`} onClick={() => handleLinkClick('交通車使用現況')}>交通車使用現況</Link>
                <Link to="/accumulation-status" className={`nav-item ${props.currentPage === '積點狀況' ? 'highlight' : ''}`} onClick={() => handleLinkClick('積點狀況')}>積點狀況</Link>
            </div> */}
        </div>
    );
}

export default connect((state) => {
    return {
        ...state.pageState
    }
})(Navbar);
