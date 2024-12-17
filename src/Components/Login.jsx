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
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            // Auto login if token exists
            dispatch(
                loginAndLoading({
                    login: true,
                    loading: true,
                    username: localStorage.getItem('username'),
                    token: token
                })
            );
        }
    }, []);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptchaValue) {
            const username = event.target.elements.username.value;
            const password = event.target.elements.password.value;

            if (username === '') {
                alert("Please enter a username");
                return;
            }

            if (password === '') {
                alert("Please enter a password");
                return;
            }

            UserLogin(username, password).then((response) => {
                if (response.data.code === 0) {
                    const token = response.data.data.token;

                    // Save login info to local storage
                    if (remember) {
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                        localStorage.setItem('token', token);
                    } else{
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('password', password);
                        sessionStorage.setItem('token', token);
                    }

                    // Login success
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

                } else {
                    const msg = response.data.msg;
                    alert("Login failed: " + msg);
                }
            }
            ).catch((error) => {
                console.error('Error Login:', error);
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
                            <input type='checkbox' id='rember' name='rember' onChange={() => setRemember(!remember)} />
                            <label htmlFor='rember'> Remember me</label>
                        </div>
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
