import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserLogin } from 'Utilities/ApiServices.js';
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(loginAndLoading({
                login: true,
                loading: true,
                username: localStorage.getItem('username'),
                token: token
            }));
            // history('/data-overview');
        }
    }, []);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptchaValue) {
            // console.log("帳號:", event.target.elements.username.value);
            // console.log("密碼:", event.target.elements.password.value);
            // console.log("驗證碼:", recaptchaValue);
            const username = event.target.elements.username.value;
            const password = event.target.elements.password.value;

            if (username === '' || password === '') {
                alert("請輸入帳號密碼");
                return;
            }

            UserLogin(username, password).then((response) => {
                //console.log(response);
                if (response.data.code === 0) {
                    const token = response.data.data.token;
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    localStorage.setItem('token', token);
                    dispatch(loginAndLoading(
                        {
                            login: true,
                            loading: true,
                            username: username,
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
                    <div className='login-username-container'>
                        <div className='login-username-title'> 
                            Username 
                        </div>
                        <div className='login-username-wrapper'>
                            <MdAccountCircle className='login-icon' />
                            <input className='login-username' type="text" name="username" placeholder="Username" />
                        </div>
                    </div>
                    <div className='login-password-container'>
                        <div className='login-password-title'>
                            Password
                        </div>
                        <div className='login-password-wrapper'>
                            <RiLockPasswordFill className='login-icon'/>
                            <input className='login-password' type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className='login-rember-forget'>
                        <div className='login-rember'>
                            <input type='checkbox' id='rember'></input>
                            <label htmlFor='rember'> Remember me</label>
                        </div>
                        {/* 忘記密碼 */}
                        <Link to='/forget-password'>
                            <div>Forgot password?</div>
                        </Link>
                    </div>
                    {/* <div className='login-capthca'>
                        <ReCAPTCHA
                            className='login-capthca'
                            sitekey="6Ld_Q5MpAAAAAGW87uMuYMynl3cxZndatKGM_UMc"
                            onChange={handleRecaptchaChange}
                        />
                    </div> */}
                    <button className='login-submit' type="submit">Login</button>
                    <div className='login-register'>
                        Don't have an account? 
                        <Link to='/register'>
                            <div className='register-text'>Register now</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
