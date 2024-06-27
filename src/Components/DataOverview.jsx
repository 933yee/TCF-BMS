import React from 'react';
import {
    changePageState,
} from 'States/actions.js';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './DataOverview.css';

function DataOverview() {
    const dispatch = useDispatch();

    const handleLinkClick = (page) => {
        dispatch(changePageState(page));
    }

    return (
        <div className='data-overview'>
            <div className='details'>
                <div className='detail-blocks'>
                    <Link to="/carbon-footprint-data-overview" className='detail-block' onClick={() => handleLinkClick('碳足跡數據總覽')}>
                        <div className='detail-title'>
                            碳足跡數據總覽
                        </div>
                        {/* <div className='detail-carbon-footprint-data-overview'> */}
                        <div className='detail-tmp-img-container detail-carbon-footprint-data-overview'></div>
                        {/* </div> */}
                    </Link>
                    <Link to="/commuting-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('通勤碳足跡數據')}>
                        <div className='detail-title'>
                            通勤碳足跡數據
                        </div>
                        {/* <div className='detail-commuting-carbon-footprint-data'> */}
                        {/* </div> */}
                        <div className='detail-tmp-img-container detail-commuting-carbon-footprint-data'></div>
                    </Link>
                    <Link to="/transportation-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('運輸碳足跡數據')}>
                        <div className='detail-title'>
                            運輸碳足跡數據
                        </div>
                        {/* <div className='detail-transportation-carbon-footprint-data'> */}
                        {/* </div> */}
                        <div className='detail-tmp-img-container detail-transportation-carbon-footprint-data'></div>
                    </Link>
                    <Link to="/current-usage-of-transportation-modes" className='detail-block' onClick={() => handleLinkClick('交通工具使用現況')}>
                        <div className='detail-title'>
                            交通工具使用現況
                        </div>
                        {/* <div className='detail-current-usage-of-transportation-modes'> */}
                        {/* </div> */}
                        <div className='detail-tmp-img-container detail-current-usage-of-transportation-modes'></div>

                    </Link>
                    <Link to="/current-usage-of-public-transportation" className='detail-block' onClick={() => handleLinkClick('交通車使用現況')}>
                        <div className='detail-title'>
                            交通車使用現況
                        </div>
                        {/* <div className='detail-current-usage-of-public-transportation'> */}
                        {/* </div> */}
                        <div className='detail-tmp-img-container detail-current-usage-of-public-transportation'></div>

                    </Link>
                    <Link to="/accumulation-status" className='detail-block' onClick={() => handleLinkClick('積點狀況')}>
                        <div className='detail-title'>
                            積點狀況
                        </div>
                        {/* <div className='detail-accumulation-status'> */}
                        {/* </div> */}
                        <div className='detail-tmp-img-container detail-accumulation-status'></div>

                    </Link>
                </div>
            </div>
        </div>
    );
}
export default DataOverview;