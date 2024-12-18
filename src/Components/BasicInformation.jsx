import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserLogin } from 'Utilities/ApiServices.js';
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";

import 'react-toastify/dist/ReactToastify.css';
import './BasicInformation.css';

function BasicInformation() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [commutingLocations, setCommutingLocations] = useState([]);
    const [businessTravelMode, setBusinessTravelMode] = useState("");
    const [drivingPurpose, setDrivingPurpose] = useState("");
    const [drivingLocation, setDrivingLocation] = useState("");
    const [personalVehicles, setPersonalVehicles] = useState([]);

    const handleActivityChange = (activity) => {
        if (selectedActivities.includes(activity)) {
            setSelectedActivities(selectedActivities.filter((item) => item !== activity));
        } else {
            setSelectedActivities([...selectedActivities, activity]);
        }
    };

    const handleAddLocation = (type) => {
        setCommutingLocations([
            ...commutingLocations,
            { id: commutingLocations.length + 1, type, value: "" },
        ]);
    };

    const handleLocationChange = (id, value) => {
        setCommutingLocations(
            commutingLocations.map((location) =>
                location.id === id ? { ...location, value } : location
            )
        );
    };

    const handleAddVehicle = () => {
        setPersonalVehicles([...personalVehicles, { id: personalVehicles.length + 1, licensePlate: "", type: "" }]);
    };

    const handleVehicleChange = (id, field, value) => {
        setPersonalVehicles(
            personalVehicles.map((vehicle) =>
                vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        new Promise((resolve, reject) => {
            const userConfirmed = window.confirm("確定要提交表單嗎？");
            if (userConfirmed) {
                resolve();
                // Login success
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const username = localStorage.getItem('username') || sessionStorage.getItem('username');
                if (token) {
                    // Auto login if token exists
                    dispatch(
                        loginAndLoading({
                            login: true,
                            loading: true,
                            username: username,
                            token: token
                        })
                    );
                }
                dispatch(
                    loginAndLoading({
                        login: true,
                        loading: true,
                        username: username,
                        token: token
                    })
                );

                // Redirect to data overview page
                history('/data-overview');
            }
        })
    };

    return (
        <div className='basic-information-container'>
            <div className='basic-information'>
                <form id="basicInformationForm" onSubmit={handleSubmit}>
                    <div className='personal-information'>
                        <h2>個人基礎資料</h2>
                        <label>
                            所屬企業:
                            <select >
                                <option value="">請選擇</option>
                                <option value="male">NVDIA</option>
                                <option value="female">INTEL</option>
                            </select>
                        </label>
                        <label>
                            姓名:
                            <input type="text" />
                        </label>
                        <label>
                            性別:
                            <select >
                                <option value="">請選擇</option>
                                <option value="male">男性</option>
                                <option value="female">女性</option>
                            </select>
                        </label>
                        <label>
                            員工編號:
                            <input type="text" />
                        </label>
                        <label>
                            所屬部門:
                            <input type="text" />
                        </label>
                        <label>
                            上班型態:
                            <select >
                                <option value="">請選擇</option>
                                <option value="remote">遠端</option>
                                <option value="onSite">現場</option>
                            </select>
                        </label>
                    </div>
                    <div className='activity-information'>
                        <h2>您的主要工作內容是否涉及以下活動？(可複選)</h2>
                        <div className='activity-list'>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="commuting"
                                        checked={selectedActivities.includes("commuting")}
                                        onChange={() => handleActivityChange("commuting")}
                                    />
                                    通勤（日常往返公司與家之間）
                                </label>
                            </div>
                            {selectedActivities.includes("commuting") && (
                                <div className='activity'>
                                    <div className='button-container'>
                                        <button type="button" onClick={() => handleAddLocation("residence")}>
                                            增加居住地點
                                        </button>
                                        <button type="button" onClick={() => handleAddLocation("office")}>
                                            增加辦公地點
                                        </button>
                                    </div>
                                    {commutingLocations.map((location) => (
                                        <div key={location.id} className='location'>
                                            <div className='delete'
                                                onClick={() => setCommutingLocations(commutingLocations.filter((item) => item.id !== location.id))}
                                            >
                                                <RxCross2 />
                                            </div>
                                            <label>
                                                {location.type === "residence" ? "居住地點:" : "辦公地點:"}
                                                <input
                                                    type="text"
                                                    value={location.value}
                                                    onChange={(e) => handleLocationChange(location.id, e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <div>
                                        <h4>通勤運具選填</h4>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <h4>綁定私人運具</h4>
                                        <div className='button-container'>
                                            <button type="button" onClick={handleAddVehicle}>
                                                增加私人運具
                                            </button>
                                        </div>
                                        {personalVehicles.map((vehicle) => (
                                            <div key={vehicle.id} className='vehicle'>
                                                <div className='delete' onClick={() => setPersonalVehicles(personalVehicles.filter((item) => item.id !== vehicle.id))}>
                                                    <RxCross2 />
                                                </div>
                                                <label>
                                                    車牌號碼:
                                                    <input
                                                        type="text"
                                                        value={vehicle.licensePlate}
                                                        onChange={(e) => handleVehicleChange(vehicle.id, "licensePlate", e.target.value)}
                                                    />
                                                </label>
                                                <label>
                                                    車輛種類:
                                                    <input
                                                        type="text"
                                                        value={vehicle.type}
                                                        onChange={(e) => handleVehicleChange(vehicle.id, "type", e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='activity-list'>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="businessTravel"
                                        checked={selectedActivities.includes("businessTravel")}
                                        onChange={() => handleActivityChange("businessTravel")}
                                    />
                                    差旅（跨城市或與業務相關的交通）
                                </label>
                            </div>
                            {selectedActivities.includes("businessTravel") && (
                                <div className='activity'>
                                    <div>
                                        <label>
                                            差旅運具選項選填:
                                            <input
                                                type="text"
                                                value={businessTravelMode}
                                                onChange={(e) => setBusinessTravelMode(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='activity-list'>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="companyVehicle"
                                        checked={selectedActivities.includes("companyVehicle")}
                                        onChange={() => handleActivityChange("companyVehicle")}
                                    />
                                    駕駛公司擁有之車輛
                                </label>
                            </div>
                            {selectedActivities.includes("companyVehicle") && (
                                <div className='activity'>
                                    <div>
                                        <label>
                                            駕駛的行程多位於:
                                            <select
                                                value={drivingLocation}
                                                onChange={(e) => setDrivingLocation(e.target.value)}
                                            >
                                                <option value="">請選擇</option>
                                                <option value="factoryInside">廠區內</option>
                                                <option value="factoryOutside">廠區外</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            駕駛目的為:
                                            <input
                                                type="text"
                                                value={drivingPurpose}
                                                onChange={(e) => setDrivingPurpose(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                <div className='submit-button'>
                    <button
                        type="button"
                        onClick={() => {
                            const form = document.getElementById("basicInformationForm");
                            if (form.checkValidity()) {
                                form.requestSubmit();
                            } else {
                                form.reportValidity();
                            }
                        }}
                    >
                        提交
                    </button>
                </div>
            </div>
        </div >
    );
};

export default BasicInformation;
