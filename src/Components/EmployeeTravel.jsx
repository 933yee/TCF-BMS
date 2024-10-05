import React, { useEffect } from 'react';
import Toolbar from 'Components/Toolbar.jsx';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { changeCurrentPage } from 'States/actions.js';

import './EmployeeTravel.css';

function EmployeeTravel(props) {
    const isDetailed = props.isDetailed;
    const detailIndex = props.detailIndex;
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataHeaders =
        isDetailed ?
            [
                '出差日期', '出差時段', '出差時間', '交通工具', '公里數', '碳足跡-KG'
            ]
            : [
                '紀錄方式', '姓名', '員工編號', '出差日期', '出差時段', '出差時間', '交通工具', '公里數', '碳足跡-KG'
            ];
    const data =
        isDetailed ?
            props.data.employeeTravel.detailedData[detailIndex] : props.data.employeeTravel.data

    const handleLinkClick = (index) => {
        if (isDetailed === true) return;
        const newPath = `${location.pathname}/${index + 1}`;
        navigate(newPath);
        dispatch(changeCurrentPage(`/employee-travel/${index + 1}`));

        // if (canCheckDetail === false) return;
        // const newPath = `${location.pathname}${index}`;
        // navigate(newPath);
    };

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleTextFieldChange = (event) => {
    }

    return (
        <><Toolbar />
            <div className='employee-travel'>

                {/* <div>
                    <CarbonDataTable headers={dataHeaders} data={fakeData} />
                </div> */}
                <div className='data-table'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {dataHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} onClick={() => handleLinkClick(index)}>
                                    <td>
                                        <input type="checkbox" onClick={handleStopPropagation}></input>
                                    </td>
                                    {row.map((item, itemIndex) => {
                                        return (
                                            <td key={itemIndex}>{item}</td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default connect((state) => {
    return {
        ...state.localDatabaseState
    }
})(EmployeeTravel);