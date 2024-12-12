import React, { useState, useEffect } from 'react';
import {
    changePageState,
} from 'States/actions.js';

import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetDashBoardOverview } from 'Utilities/ApiServices.js';
import Toolbar from 'Components/Toolbar.jsx';

import './DataOverview.css';
import { initDataOverview } from 'States/actions.js';

function DataOverview(props) {
    const [dashboardData, setDashboardData] = useState({});
    const dispatch = useDispatch();

    const currentTime = new Date().getTime();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneMonthAgoTime = oneMonthAgo.getTime();

    function formatDate(date) {
        function padZero(num) {
            return num < 10 ? '0' + num : num;
        }
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        return `${year}-${month}-${day}%2B08:00`;
    }

    const endDate = formatDate(new Date(currentTime));
    const startDate = formatDate(new Date(oneMonthAgoTime));

    // Get dashboard overview data from server
    useEffect(() => {
        if (Object.keys(props.data.dataOverview).length !== 0) {
            setDashboardData(props.data.dataOverview);
            return;
        }
        GetDashBoardOverview(props.token, startDate).then((response) => {
            if (response.data.code === 0) {
                const data = response.data.data;
                const initData = {
                    totalEmployeeCarbon: data.totalEmployeeCarbon,
                    totalFreightCarbon: data.totalFreightCarbon,
                    totalEmployeeCount: data.totalEmployeeCount,
                    totalCarbon: data.totalCarbon,
                    totalEmployeeCarbonReduce: data.totalEmployeeCarbonReduce,
                    totalFreightCarbonReduce : data.totalFreightCarbonReduce,
                    totalCarbonReduce: data.totalCarbonReduce,
                    totalEmployeeCountReduce: data.totalEmployeeCountReduce,
                    transInfo: data.transInfo.reduce((result, item) => {
                        result[item.t] = item.cnt;
                        return result;
                    }, {}),
                    reduce: data.transInfo.reduce((result, item) => {
                        result[item.t] = item.pnt;
                        return result;
                    }, {}),
                }
                setDashboardData(initData);
                dispatch(initDataOverview(response.data.data));
            }
        }
        ).catch((error) => {
            console.log(error);
        });
    }, [startDate]);

    const handleLinkClick = (page) => {
        // dispatch(changePageState(page));
    }

    const formattedNumber = (number) => {
        if (number === undefined) {
            return '';
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <Toolbar hideAll={true} />
            <div className='data-overview'>
                <div className='details'>
                    <div className='detail-blocks'>
                        <div to="/carbon-footprint-data-overview" className='detail-block' onClick={() => handleLinkClick('碳足跡數據總覽')}>
                            <div className='detail-title'>
                                碳足跡數據總覽
                            </div>
                            <div className='detail-carbon-footprint-data-overview'>
                                <div className='block'>
                                    員工通勤碳足跡
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalEmployeeCarbon)} kg
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    運輸碳足跡
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalFreightCarbon)} kg
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    參與人數
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalEmployeeCount)} 人
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    總碳足跡數據
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalCarbon)} kg
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='detail-carbon-footprint-data-overview'> */}
                            {/* <div className='detail-tmp-img-container detail-carbon-footprint-data-overview'></div> */}
                            {/* </div> */}
                        </div>
                        <div to="/commuting-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('通勤碳足跡數據')}>
                            <div className='detail-title'>
                                通勤碳足跡數據
                            </div>
                            <div className='detail-commuting-carbon-footprint-data'>
                                <div className='block'>
                                    員工通勤碳足跡
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalEmployeeCarbon)} kg
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    減少碳足跡總量
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalFreightCarbon)} kg
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    參與人數
                                    <div className='block-data'>
                                        {formattedNumber(dashboardData.totalEmployeeCount)} 人
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    表現最佳部門
                                    <div className='block-data'>
                                        業務部
                                    </div>
                                </div>
                            </div>
                            {/* <div className='detail-commuting-carbon-footprint-data'> */}
                            {/* </div> */}
                            {/* <div className='detail-tmp-img-container detail-commuting-carbon-footprint-data'></div> */}
                        </div>
                        <div to="/transportation-carbon-footprint-data" className='detail-block' onClick={() => handleLinkClick('運輸碳足跡數據')}>
                            <div className='detail-title'>
                                運輸碳足跡數據
                            </div>
                            {/* <div className='detail-transportation-carbon-footprint-data'> */}
                            {/* </div> */}
                            <div className='detail-tmp-img-container detail-transportation-carbon-footprint-data'></div>
                        </div>
                        <div to="/current-usage-of-transportation-modes" className='detail-block' onClick={() => handleLinkClick('交通工具使用現況')}>
                            <div className='detail-title'>
                                交通工具使用現況
                            </div>
                            <div className='detail-current-usage-of-transportation-modes'>
                                <div className='block'>
                                    公車
                                    <div className='block-data'>
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.BUS)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    步行
                                    <div className='block-data'>
                                        {/* TODO 沒有捷運 */}
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.WALK)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    汽車
                                    <div className='block-data'>
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.CAR)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    機車
                                    <div className='block-data'>
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.SCOOTER)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    火車
                                    <div className='block-data'>
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.TRAIN)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                                <div className='block'>
                                    腳踏車
                                    <div className='block-data'>
                                        {dashboardData.transInfo && formattedNumber(dashboardData.transInfo.BIKE)}
                                        <div className='block-data-compare'>
                                            0 %
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='detail-current-usage-of-transportation-modes'> */}
                            {/* </div> */}
                            {/* <div className='detail-tmp-img-container detail-current-usage-of-transportation-modes'></div> */}

                        </div>
                        <div to="/current-usage-of-public-transportation" className='detail-block' onClick={() => handleLinkClick('交通車使用現況')}>
                            <div className='detail-title'>
                                交通車使用現況
                            </div>
                            {/* <div className='detail-current-usage-of-public-transportation'> */}
                            {/* </div> */}
                            <div className='detail-tmp-img-container detail-current-usage-of-public-transportation'></div>

                        </div>
                        <div to="/accumulation-status" className='detail-block' onClick={() => handleLinkClick('積點狀況')}>
                            <div className='detail-title'>
                                積點狀況
                            </div>
                            {/* <div className='detail-accumulation-status'> */}
                            {/* </div> */}
                            <div className='detail-tmp-img-container detail-accumulation-status'></div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default connect((state) => {
    return {
        ...state.loginState,
        ...state.localDatabaseState
    }
})(DataOverview);