import React, { useEffect } from 'react';
import Toolbar from 'Components/Toolbar.jsx';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './EmployeeTravel.css';

function EmployeeTravel(props) {
    const navigate = useNavigate();
    const headers = [
        '紀錄方式', '姓名', '員工編號', '出差日期', '出差時段', '出差時間', '交通工具', '公里數', '碳足跡-KG'
    ]
    const data = props.data.employeeTravel.data;
    const location = useLocation();

    const handleLinkClick = (index) => {
        // if (canCheckDetail === false) return;
        // const newPath = `${location.pathname}${index}`;
        // navigate(newPath);
    };

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleTextFieldChange = (event) => {
        console.log(event.target.value);
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
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} onClick={() => handleLinkClick(`/${index}`)}>
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