import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { englishToChineseMap } from 'Utilities/Auxiliary.js';
import { changeCurrentPage, deletePage } from 'States/actions.js';
import { IoIosArrowForward } from "react-icons/io";

import './Navbar.css';

function Navbar(props) {
    const [pathname, setPathname] = useState(window.location.pathname);
    const paths = pathname.split('/');
    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (page) => {
        dispatch(changeCurrentPage(page));
    }
    const handleDeletePage = (page) => {
        dispatch(deletePage(page));
    }

    const getClickedEmployee = () => {
        switch (paths[1]) {
            case 'employee-travel':
                return `${props.data.employeeTravel.data[paths[2] - 1][1]} ${props.data.employeeTravel.data[paths[2] - 1][2]}`
            case 'mobile-source-emissions':
                return `${props.data.mobileSourceEmissions.data[paths[2] - 1][2]} ${props.data.mobileSourceEmissions.data[paths[2] - 1][3]}`;
            default:
                return {};
        }
    }
    return (
        <div className='navbar-container'>
            {/* <div className='path'> */}
            {/* {paths.length > 1 ? (
                    <Link to={`/${paths[1]}`} className='path-text' onClick={() => handleLinkClick(paths[1])}>
                        {englishToChineseMap[paths[1]]}
                    </Link>
                ) : (
                    <>
                        {englishToChineseMap[paths[1]]}
                    </>
                )
                }
                {paths.length > 2 ? (
                    <>
                        <div className="split">
                            <IoIosArrowForward />
                        </div>
                        <div className='path-text'>
                            {getClickedEmployee()}
                        </div>

                    </>
                ) : ''} */}

            {/* </div> */}
            <div className='user-info'>
                {props.account}
            </div>
            {/* {props.pages.map((page, index) => (
                <div key={index} className={`page ${ props.currentPage === page ? 'highlight' : '' } `} >
                    <Link to={`/ ${ chineseToEnglishMap[page] } `} className='page-text' onClick={() => handleLinkClick(page)}>
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
            ))} */}
            {/* <img className='logo' src='./images/ECHO_TCF.png' alt='ECHO_TCF'></img>
            <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                <div className={`menu - toggle - hamburger - top ${ isOpen ? 'toggle' : '' } `}></div>
                <div className={`menu - toggle - hamburger - mid ${ isOpen ? 'toggle' : '' } `}></div>
                <div className={`menu - toggle - hamburger - bot ${ isOpen ? 'toggle' : '' } `}></div>
            </div> */}
            {/* <div className={`nav - items ${ isOpen ? 'show' : '' } `}>
                <Link to="/data-overview" className={`nav - item ${ props.currentPage === '數據總覽' ? 'highlight' : '' } `} onClick={() => handleLinkClick('數據總覽')}>數據總覽</Link>
                <Link to="/carbon-footprint-data-overview" className={`nav - item ${ props.currentPage === '碳足跡數據總覽' ? 'highlight' : '' } `} onClick={() => handleLinkClick('碳足跡數據總覽')}>碳足跡數據總覽</Link>
                <Link to="/commuting-carbon-footprint-data" className={`nav - item ${ props.currentPage === '通勤碳足跡數據' ? 'highlight' : '' } `} onClick={() => handleLinkClick('通勤碳足跡數據')}>通勤碳足跡數據</Link>
                <Link to="/transportation-carbon-footprint-data" className={`nav - item ${ props.currentPage === '運輸碳足跡數據' ? 'highlight' : '' } `} onClick={() => handleLinkClick('運輸碳足跡數據')}>運輸碳足跡數據</Link>
                <Link to="/current-usage-of-transportation-modes" className={`nav - item ${ props.currentPage === '交通工具使用現況' ? 'highlight' : '' } `} onClick={() => handleLinkClick('交通工具使用現況')}>交通工具使用現況</Link>
                <Link to="/current-usage-of-public-transportation" className={`nav - item ${ props.currentPage === '交通車使用現況' ? 'highlight' : '' } `} onClick={() => handleLinkClick('交通車使用現況')}>交通車使用現況</Link>
                <Link to="/accumulation-status" className={`nav - item ${ props.currentPage === '積點狀況' ? 'highlight' : '' } `} onClick={() => handleLinkClick('積點狀況')}>積點狀況</Link>
            </div> */}
        </div>
    );
}

export default connect((state) => {
    return {
        ...state.loginState,
        ...state.pageState,
        ...state.localDatabaseState
    }
})(Navbar);