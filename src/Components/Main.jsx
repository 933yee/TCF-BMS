import React, { useEffect, useState } from 'react';
import {
    useLocation,
    Route,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import DataOverview from 'Components/DataOverview.jsx';
import Panel from 'Components/Panel.jsx';
import Navbar from 'Components/Navbar.jsx';
import Login from 'Components/Login.jsx';
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

    return (
        <div className='main-container'>
            {!props.loading ? (
                <>
                    {
                        // props.login ? null :
                        //     (
                        //         <div className="loading-indicator">
                        //             <div className='complete'>
                        //                 <input className='complete-input' type='checkbox' id='check'></input>
                        //                 <label className='check-container' htmlFor="check">
                        //                 </label>
                        //             </div>
                        //         </div>
                        //     )
                    }
                    {/* <CSSTransition
                        in={props.login}
                        timeout={1000}
                        classNames="fade"
                        unmountOnExit
                    > */}
                    <>
                        <Panel />
                        <div className='contents'>
                            <Navbar />
                            <Route path="/data-overview" exact component={() => <DataOverview />} />
                            <Route path="/carbon-footprint-data-overview" exact component={() => <>碳足跡數據總覽</>} />
                            <Route path="/commuting-carbon-footprint-data" exact component={() => <>通勤碳足跡數據</>} />
                            <Route path="/transportation-carbon-footprint-data" exact component={() => <>運輸碳足跡數據</>} />
                            <Route path="/current-usage-of-transportation-modes" exact component={() => <>交通工具使用情況</>} />
                            <Route path="/current-usage-of-public-transportation" exact component={() => <>交通車使用情況</>} />
                            <Route path="/accumulation-status" exact component={() => <>積點狀況</>} />
                        </div>
                    </>
                    {/* </CSSTransition> */}
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
