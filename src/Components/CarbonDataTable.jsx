import React from 'react';
import './CarbonDataTable.css';
import { useDispatch } from 'react-redux';
import { changePageState } from 'States/actions.js';
import englishToChineseMap from 'Utilities/EnglishToChinese.js';

function CarbonDataTable(props) {
    const dispatch = useDispatch();
    const headers = props.headers;
    const data = props.data;

    const handleLinkClick = (link) => {
        const chinesePageState = englishToChineseMap[link.slice(1)];
        if (chinesePageState) {
            dispatch(changePageState(chinesePageState));
        }
    };

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
                        <tr key={index}>
                            <td>
                                <input type="checkbox"></input>
                            </td>
                            {headers.map((header, index) => {
                                if (header === '查看') {
                                    return (
                                        <td key={index}>
                                            <button>
                                                {row[header]}
                                            </button>
                                        </td>
                                    )
                                }
                                return (
                                    <td key={index}>{row[header]}</td>
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
