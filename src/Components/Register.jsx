import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserLogin } from 'Utilities/ApiServices.js';
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import './Register.css';

function Register() {
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
        <div className='register-container'>
            <div className='register-panel'>
                <img className='logo' src='./images/logo.png' alt='ECHO_TCF'></img>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-data-container'>
                        <div className='register-data-title'> 
                            Username 
                        </div>
                        <div className='register-data-wrapper'>
                            <MdAccountCircle className='register-icon' />
                            <input className='register-data' type="text" name="username" placeholder="Username" />
                        </div>
                    </div>
                    <div className='register-data-container'>
                        <div className='register-data-title'>
                            Password
                        </div>
                        <div className='register-data-wrapper'>
                            <RiLockPasswordFill className='register-icon'/>
                            <input className='register-data' type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className='register-data-container'>
                        <div className='register-data-title'>
                            Confirm Password
                        </div>
                        <div className='register-data-wrapper'>
                            <RiLockPasswordFill className='register-icon'/>
                            <input className='register-data' type="password" name="password" placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className='register-data-container'>
                        <div className='register-data-title'>
                            Email
                        </div>
                        <div className='register-data-wrapper'>
                            <MdEmail className='register-icon'/>
                            <input className='register-data' type="email" name="email" placeholder="Email" />
                        </div>
                    </div>

                    <button className='register-submit' type="submit">Register</button>
                    <div className='register-login'>
                        Already have an account?
                        <Link to='/login'>
                            <div className='login-text'>Login now</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
