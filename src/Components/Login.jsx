import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {
    Route,
} from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import Navbar from 'Components/Navbar.jsx';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptchaValue) {
            console.log("帳號:", event.target.elements.account.value);
            console.log("密碼:", event.target.elements.password.value);
            console.log("驗證碼:", recaptchaValue);
            dispatch(loginAndLoading(true));
            history.push('/data-overview');
        } else {
            alert("你是機器人嗎");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-panel'>
                <img className='logo' src='./images/ECHO_TCF.png' alt='ECHO_TCF'></img>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input className='login-account' type="text" name="account" placeholder="帳號" />
                    <input className='login-password' type="password" name="password" placeholder="密碼" />
                    <div className='login-capthca'>
                        <ReCAPTCHA
                            className='login-capthca'
                            sitekey="6Ld_Q5MpAAAAAGW87uMuYMynl3cxZndatKGM_UMc"
                            onChange={handleRecaptchaChange}
                        />
                    </div>
                    <button className='login-submit' type="submit">登入</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
