import React from 'react';
import './CarbonDataTable.css';
import { useDispatch } from 'react-redux';
import { changePageState } from 'States/actions.js';
import { englishToChineseMap } from 'Utilities/Auxiliary.js';
import {
    useLocation,
    useNavigate,
    Route,
    Routes,
} from 'react-router-dom';

function CarbonDataTable(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headers = props.headers;
    const data = props.data;
    const dropDownHeaderIndex = props.dropDownHeaderIndex;
    const dropDownOptions = props.dropDownOptions;
    const isDetail = props.isDetail;
    const location = useLocation();

    const handleLinkClick = (index) => {
        if (isDetail === true) return;
        const newPath = `${location.pathname}${index}`;
        navigate(newPath);
    };

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleTextFieldChange = (event) => {
        console.log(event.target.value);
    }

    return (
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
                                if (dropDownHeaderIndex && dropDownHeaderIndex.includes(itemIndex)) {
                                    return (
                                        <td key={itemIndex}>
                                            <select
                                                onClick={handleStopPropagation}
                                            // onChange={(e) => handleDropdownChange(e, index)}
                                            >
                                                <option>
                                                </option>
                                                {dropDownOptions[itemIndex].map((option, i) => (
                                                    <option key={i} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                    )
                                }
                                return (
                                    <td key={index}>{item}</td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarbonDataTable;
