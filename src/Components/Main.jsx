import React, { useEffect, useState } from 'react';
import {
    useLocation,
    Route,
    Routes,
    Switch
} from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import DataOverview from 'Components/DataOverview.jsx';
import Panel from 'Components/Panel.jsx';
import Navbar from 'Components/Navbar.jsx';
import Login from 'Components/Login.jsx';
import EmployeeTravel from 'Components/EmployeeTravel.jsx';
import UpstreamTransportation from 'Components/UpstreamTransportation.jsx';
import EmployeeCommuting from 'Components/EmployeeCommuting.jsx';
import EmployeeData from 'Components/EmployeeData.jsx';
import VehicleData from 'Components/VehicleData.jsx';
import CarbonFootprintDataOverview from 'Components/CarbonFootprintDataOverview.jsx';
import MobileSourceEmissions from 'Components/MobileSourceEmissions.jsx';

import DetailedData from 'Components/DetailedData.jsx';

import Toolbar from 'Components/Toolbar.jsx';

import { connect, useDispatch } from 'react-redux';
import { login, initializeDatabase } from 'States/actions.js';

import './Animations.css';
import './Main.css';

function Main(props) {
    const [renderKey, setRenderKey] = useState(0);
    const dispatch = useDispatch();
    const localData = props.data;

    useEffect(() => {
        setRenderKey(prevKey => prevKey + 1);
    }, [props.currentPage]);

    useEffect(() => {
        if (props.loading) {
            setTimeout(() => {
                dispatch(login(true));
            }, 3000);
        }
    }, [props.loading]);

    // return <EmployeeData></EmployeeData>
    return (
        <div className='main-container' key={renderKey}>
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
                                    <Route
                                        path="/mobile-source-emissions"
                                        exact
                                        element={
                                            <MobileSourceEmissions />
                                        }
                                    />
                                    {localData['mobileSourceEmissions'].data.map((row, index) => (
                                        <Route key={index} path={`/mobile-source-emissions/${index + 1}`} element={
                                            <MobileSourceEmissions isDetailed={true} detailIndex={index} />
                                        } />
                                    ))}

                                    <Route path="/vehicle-data" exact
                                        element={
                                            <VehicleData />
                                        }
                                    />
                                    <Route path="/employee-data" exact element={
                                        <EmployeeData />
                                    }
                                    />
                                    <Route path="/*" element="404 not found" />
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
        ...state.loginState,
        ...state.pageState,
        ...state.localDatabaseState
    }
})(Main);