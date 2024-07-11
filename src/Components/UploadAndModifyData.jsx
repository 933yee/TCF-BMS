import React, { useState } from 'react';
import CarbonDataTable from 'Components/CarbonDataTable.jsx';
import { IoIosClose } from "react-icons/io";
import Toolbar from 'Components/Toolbar.jsx';

import './UploadAndModifyData.css';

const dataHeaders = [
    '性別', '姓名', '員工編號', '部門', '職稱', '使用運具概況', '狀態', '備註'
]

const fakeData = [
    { '性別': '男', '姓名': '陳美華', '員工編號': 'A001', '部門': '研發部', '職稱': '工程師', '使用運具概況': '火車、公車、走路、機車', '狀態': 'active', '備註': '無' },
    { '性別': '女', '姓名': '許曉明', '員工編號': 'B002', '部門': '行政部', '職稱': '行政助理', '使用運具概況': '走路、汽車', '狀態': 'inactive', '備註': '無' },
]

function UploadAndModifyData() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(fakeData);


    const [checkedItems, setCheckedItems] = useState({
        upstreamAndDownstreamTransportation: false,
        employeeCommuting: false,
        employeeTravel: false,
        officialVehicle: false,
    });


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: checked,
        }));
    };

    const onClickAddData = () => {
        setShowModal(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = {
            "性別": event.target.elements.gender.value,
            "姓名": event.target.elements.name.value,
            "員工編號": event.target.elements.employeeId.value,
            "部門": event.target.elements.dept.value,
            "職稱": event.target.elements.jobTitle.value,
            "使用運具概況": "未知",
            "狀態": "inactive",
            "備註": "無"
        };
        setData([...data, newData]);

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const getTransportationMethods = () => {
        return <div className='transportation-method'>
            <div className="form-group">
                <label>常見運具:</label>
                <div className='common-transportation'>
                    <label><input type="checkbox" /> 步行</label>
                    <label><input type="checkbox" /> 腳踏車</label>
                    <label><input type="checkbox" /> 機器腳踏車(汽油)</label>
                    <label><input type="checkbox" /> 自用小客車(汽油)</label>
                    <label><input type="checkbox" /> 營業小客車(汽油)</label>
                    <label><input type="checkbox" /> 臺灣鐵路運輸服務(柴聯車)</label>
                    <label><input type="checkbox" /> 臺灣鐵路運輸服務(電聯車)</label>
                    <label><input type="checkbox" /> 高速鐵路運輸服務</label>
                </div>
            </div>

            <div className="form-group">
                <label>公車:</label>
                <div className='bus'>
                    <label><input type="checkbox" /> 普通甲類市區公車</label>
                    <label><input type="checkbox" /> 低地板甲類市區公車</label>
                    <label><input type="checkbox" /> 乙類市區公車</label>
                </div>
            </div>

            <div className="form-group">
                <label>客車與營業貨車:</label>
                <div className='bus-and-truck'>
                    <label><input type="checkbox" /> 自用大客車(柴油)</label>
                    <label><input type="checkbox" /> 營業大貨車(柴油)</label>
                    <label><input type="checkbox" /> 營業小貨車(柴油)</label>
                    <label><input type="checkbox" /> 營業小貨車(汽油)</label>
                </div>
            </div>

            <div className="form-group">
                <label>常溫貨車:</label>
                <div className='normal-temperature-truck'>
                    <label><input type="checkbox" /> 3.49噸常溫貨車服務(裝載率31％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.49噸常溫貨車服務(裝載率84％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.5~7.4噸常溫貨車服務(裝載率82％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 7.5~16噸常溫貨車服務(裝載率80％，包含營業據點排放)</label>
                </div>
            </div>

            <div className="form-group">
                <label>低溫貨車:</label>
                <div className='low-temperature-truck'>
                    <label><input type="checkbox" /> 3.49噸低溫貨車服務(裝載率32％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.49噸低溫貨車服務(裝載率77％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.5~7.4噸低溫貨車服務(裝載率41％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.5~7.4噸低溫貨車服務(裝載率69％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 7.5~16噸低溫貨車服務(裝載率65％，包含營業據點排放)</label>
                    <label><input type="checkbox" /> 3.49噸多溫貨車服務(包含營業據點排放)</label>
                </div>
            </div>
        </div>
    }


    return (
        <> <Toolbar onClickAddData={onClickAddData} />
            <div className='employee-travel'>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content-container">
                            <div className='close-button' onClick={handleCloseModal}>
                                <IoIosClose />
                            </div>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <h2>新增資料</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className='title'>所屬企業</label>
                                        <select name='company'>
                                            <option>碳行者科技股份有限公司</option>
                                            <option>嘉里大榮物流</option>
                                            <option>順風貨運</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>姓名</label>
                                        <input type="text" className='textfield' name='name' />
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>性別</label>
                                        <select name='gender'>
                                            <option>男性</option>
                                            <option>女性</option>
                                            <option>非二元性別</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>員工編號</label>
                                        <input type="text" className='textfield' name='employeeId' />
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>所屬部門</label>
                                        <select name='dept'>
                                            <option>管理部</option>
                                            <option>財務部</option>
                                            <option>人力資源部</option>
                                            <option>營銷部</option>
                                            <option>銷售部</option>
                                            <option>運營部</option>
                                            <option>信息技術部</option>
                                            <option>法務部</option>
                                            <option>研發部</option>
                                            <option>客戶服務部</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>職稱</label>
                                        <input type="text" className='textfield' name='jobTitle' />
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>聯絡信箱</label>
                                        <input type="email" className='textfield' name='email' />
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>居住地址</label>
                                        <div className='user-address'>
                                            <select id="city" name="city" className='city'>
                                                <option value="" >縣市</option>
                                            </select>
                                            <select id="area" name="area" className='town'>
                                                <option value="">鄉鎮市區</option>
                                            </select>
                                        </div>
                                        <input name='street' type="text" placeholder="路街名" className='street textfield' />
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>上班型態</label>
                                        <select name='workType'>
                                            <option>遠距</option>
                                            <option>實體</option>
                                            <option>混合</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>上班天數</label>
                                        <select name='workDays'>
                                            <option>7</option>
                                            <option>6</option>
                                            <option>5</option>
                                            <option>4</option>
                                            <option>3</option>
                                            <option>2</option>
                                            <option>1</option>
                                            <option>不固定</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>上班的日子</label>
                                        <div className='work-day'>
                                            <label>
                                                <input type="checkbox" name='monday' />
                                                星期一
                                            </label>
                                            <label>
                                                <input type="checkbox" name='tuesday' />
                                                星期二
                                            </label>
                                            <label>
                                                <input type="checkbox" name='wednesday' />
                                                星期三
                                            </label>
                                            <label>
                                                <input type="checkbox" name='thursday' />
                                                星期四
                                            </label>
                                            <label>
                                                <input type="checkbox" name='friday' />
                                                星期五
                                            </label>
                                            <label>
                                                <input type="checkbox" name='saturday' />
                                                星期六
                                            </label>
                                            <label>
                                                <input type="checkbox" name='sunday' />
                                                星期天
                                            </label>
                                            <label>
                                                <input type="checkbox" name='notFixed' />
                                                不固定
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className='title'>使用交通運具情形</label>
                                        <div className='transportation'>
                                            <label>
                                                <input type="checkbox"
                                                    name='upstreamAndDownstreamTransportation'
                                                    checked={checkedItems['upstreamAndDownstreamTransportation']}
                                                    onChange={handleCheckboxChange}
                                                />
                                                上下游運輸
                                            </label>
                                            {checkedItems['upstreamAndDownstreamTransportation'] && getTransportationMethods()}
                                            <label>
                                                <input type="checkbox"
                                                    name='employeeCommuting'
                                                    checked={checkedItems['employeeCommuting']}
                                                    onChange={handleCheckboxChange}
                                                />
                                                員工通勤
                                            </label>
                                            {checkedItems['employeeCommuting'] && getTransportationMethods()}
                                            <label>
                                                <input type="checkbox"
                                                    name='employeeTravel'
                                                    checked={checkedItems['employeeTravel']}
                                                    onChange={handleCheckboxChange}
                                                />
                                                員工差旅
                                            </label>
                                            {checkedItems['employeeTravel'] && getTransportationMethods()}
                                            <label>
                                                <input type="checkbox"
                                                    name='officialVehicle'
                                                    checked={checkedItems['officialVehicle']}
                                                    onChange={handleCheckboxChange}
                                                />
                                                公務車駕駛
                                            </label>
                                            {checkedItems['officialVehicle'] && getTransportationMethods()}
                                        </div>
                                    </div>
                                    <div className='submit-button-container'>
                                        <button
                                            type="submit"
                                            className='submit-button'
                                        >
                                            提交資料
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )
                }
                <div>
                    <CarbonDataTable headers={dataHeaders} data={data} />
                </div>
            </div >
        </>
    );
}
export default UploadAndModifyData;