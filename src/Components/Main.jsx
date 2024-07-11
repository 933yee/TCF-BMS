import React, { useEffect, useState } from 'react';
import {
    useLocation,
    Route,
    Routes,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import DataOverview from 'Components/DataOverview.jsx';
import Panel from 'Components/Panel.jsx';
import Navbar from 'Components/Navbar.jsx';
import Login from 'Components/Login.jsx';
import EmployeeTravel from 'Components/EmployeeTravel.jsx';
import UpstreamTransportation from 'Components/UpstreamTransportation.jsx';
import EmployeeCommuting from 'Components/EmployeeCommuting.jsx';
import UploadAndModifyData from 'Components/UploadAndModifyData.jsx';
import CarbonFootprintDataOverview from 'Components/CarbonFootprintDataOverview.jsx';

import DetailedData from 'Components/DetailedData.jsx';

import Toolbar from 'Components/Toolbar.jsx';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from 'States/actions.js';

import './Animations.css';
import './Main.css';

function Main(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.loading) {
            setTimeout(() => {
                dispatch(login(true));
            }, 3000);
        }
    }, [props.loading]);
    // return <UploadAndModifyData></UploadAndModifyData>
    return (
        <div className='main-container'>
            {props.loading ? (
                <>
                    {
                        props.login ? null :
                            (
                                <div className="loading-indicator">
                                    <div className='complete'>
                                        <input className='complete-input' type='checkbox' id='check'></input>
                                        <label className='check-container' htmlFor="check">
                                        </label>
                                    </div>
                                </div>
                            )
                    }
                    <CSSTransition
                        in={props.login}
                        timeout={1000}
                        classNames="fade"
                        unmountOnExit
                    >
                        <>
                            <Panel />
                            <div className='contents'>
                                <Navbar />
                                <Routes>
                                    <Route path="/data-overview" exact element={<DataOverview />} />
                                    <Route path="/carbon-footprint-data-overview" exact element={<CarbonFootprintDataOverview />} />
                                    <Route path="/commuting-carbon-footprint-data" exact element={<>通勤碳足跡數據</>} />
                                    <Route path="/transportation-carbon-footprint-data" exact element={<>運輸碳足跡數據</>} />
                                    <Route path="/current-usage-of-transportation-modes" exact element={<>交通工具使用情況</>} />
                                    <Route path="/current-usage-of-public-transportation" exact element={<>交通車使用情況</>} />
                                    <Route path="/accumulation-status" exact element={<>積點狀況</>} />
                                    <Route path="/employee-travel/*" exact element={<EmployeeTravel />} />
                                    <Route path="/upstream-transportation" exact element={<UpstreamTransportation />} />
                                    <Route path="/downstream-transportation" exact element={<UpstreamTransportation />} />
                                    <Route path="/employee-commuting" exact element={<EmployeeCommuting />} />
                                    <Route path="/official-vehicle" exact element={<>公務車</>} />
                                    <Route path="/upload-and-modify-data" exact element={<UploadAndModifyData />} />
                                    {/* <Route path="/employee-detail" element={<DetailedData />} /> */}
                                </Routes>
                            </div>
                        </>
                    </CSSTransition>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default connect((state) => {
    return {
        ...state.loginState
    }
})(Main);
