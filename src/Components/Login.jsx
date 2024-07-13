import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserLogin } from 'Utilities/ApiServices.js';

import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(loginAndLoading({
                login: true,
                loading: true,
                account: localStorage.getItem('account'),
                token: token
            }));
            history('/data-overview');
        }
    }, []);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptchaValue) {
            // console.log("帳號:", event.target.elements.account.value);
            // console.log("密碼:", event.target.elements.password.value);
            // console.log("驗證碼:", recaptchaValue);
            const account = event.target.elements.account.value;
            const password = event.target.elements.password.value;
            UserLogin(account, password).then((response) => {
                console.log(response);
                if (response.data.success) {
                    const token = response.data.data.token;
                    localStorage.setItem('account', account);
                    localStorage.setItem('password', password);
                    localStorage.setItem('token', token);
                    dispatch(loginAndLoading(
                        {
                            login: true,
                            loading: true,
                            account: account,
                            token: token
                        }
                    ));
                    history('/data-overview');
                } else {
                    alert("登入失敗");
                }
            }
            ).catch((error) => {
                console.error('Error Login:', error);
                alert("登入失敗");
            }
            );
        } else {
            alert("你是機器人嗎");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-panel'>
                <img className='logo' src='./images/logo.png' alt='ECHO_TCF'></img>
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
