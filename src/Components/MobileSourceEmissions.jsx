import React, { useState, useEffect } from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import './MobileSourceEmissions.css';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';
import Toolbar from 'Components/Toolbar.jsx';
import { connect, useDispatch } from 'react-redux';
import { changeCurrentPage } from 'States/actions.js';

function MobileSourceEmissions(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const showVehicleTypeFilter = true;
    const isDetailed = props.isDetailed;
    const detailIndex = props.detailIndex;
    const dataHeaders =
        isDetailed ?
            [
                '日期', '運輸時段', '運輸時間', '交通工具', '公里數', '貨物名稱', '貨物公斤數', '碳足跡-KG'
            ]
            : [
                '部門', '交通工具目的', '車牌號碼', '司機', '日期', '運輸時段', '運輸時間', '交通工具', '公里數', '碳足跡-KG'
            ];
    const data =
        isDetailed ?
            props.data.mobileSourceEmissions.detailedData[detailIndex] : props.data.mobileSourceEmissions.data;

    const [cargoWeight, setCargoWeight] = useState([]);

    useEffect(() => {
        if (isDetailed) {
            const weight = [];
            data.map((row, index) => {
                weight.push(0);
            });
            setCargoWeight(weight);
        }
    }, []);

    const handleTextFieldChange = (event, index) => {
        const weight = [...cargoWeight];
        weight[index] = event.target.value;
        setCargoWeight(weight);
    }

    // department filter
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const handleDepartmentChange = (department) => {
        if (department === "請選擇部門") department = '';
        setSelectedDepartment(department);
    };

    // vehicle type filter
    const [vehicleTypeFilters, setVehicleTypeFilters] = useState({
        "貨物長途運輸": true,
        "人員運輸": true,
        "貨物廠區運輸": true,
    });

    const handleVehicleTypeFilters = (name, checked) => {
        const TempVehicleTypeFilters = { ...vehicleTypeFilters };
        TempVehicleTypeFilters[name] = checked;
        setVehicleTypeFilters(TempVehicleTypeFilters);
    };

    const handleLinkClick = (index) => {
        if (isDetailed === true) return;
        const newPath = `${location.pathname}/${index + 1}`;
        navigate(newPath);
        dispatch(changeCurrentPage(`/mobile-source-emissions/${index + 1}`));
    };

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const filterData = (data) => {
        if (isDetailed) return data;
        data = data.filter(row => {
            if (vehicleTypeFilters["貨物長途運輸"] && row[1] === "貨物長途運輸") return true;
            if (vehicleTypeFilters["人員運輸"] && row[1] === "人員運輸") return true;
            if (vehicleTypeFilters["貨物廠區運輸"] && row[1] === "貨物廠區運輸") return true;
        });

        if (selectedDepartment === '') return data;
        data = data.filter((row) => row[0] === selectedDepartment);
        return data;
    }

    return (
        <><Toolbar
            showVehicleTypeFilter={isDetailed ? false : showVehicleTypeFilter}
            handleVehicleTypeFilters={handleVehicleTypeFilters}
            handleDepartmentChange={handleDepartmentChange}
            vehicleTypeFilters={vehicleTypeFilters}
        />
            <div className='mobile-source-emissions'>
                {/* {<div>
                    <CarbonDataTable
                        headers={dataHeaders}
                        data={data}
                        isDetail={isDetail}
                    />
                </div>} */}
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
                            {filterData(data).map((row, index) => (
                                <tr key={index} onClick={() => handleLinkClick(index)}>
                                    <td>
                                        <input type="checkbox" onClick={handleStopPropagation}></input>
                                    </td>
                                    {row.map((item, itemIndex) => {
                                        if (isDetailed && itemIndex === 7) {
                                            return (
                                                <td key={itemIndex}>
                                                    <input type='text' value={cargoWeight[itemIndex]}
                                                        onChange={
                                                            (event) => handleTextFieldChange(event, index)
                                                        }>
                                                    </input>
                                                </td>
                                            )
                                        }
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
        ...state.loginState,
        ...state.dataState,
        ...state.localDatabaseState
    }
})(MobileSourceEmissions);