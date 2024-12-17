import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserLogin } from 'Utilities/ApiServices.js';
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(true);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const username = localStorage.getItem('username') || sessionStorage.getItem('username');
        if (token) {
            // Auto login if token exists
            dispatch(
                loginAndLoading({
                    login: true,
                    loading: true,
                    // tmp
                    basic_info: true,
                    username: username,
                    token: token
                })
            );
        }

        // Check if there is a toast message
        const queryParams = new URLSearchParams(location.search);
        const toastMessage = queryParams.get('toastMessage');
        const toastType = queryParams.get('toastType');

        // Display toast message
        if (toastMessage) {
            if (toastType === 'success') {
                toast.success(decodeURIComponent(toastMessage));
            } 
            window.history.replaceState(null, '', '/login');
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
                toast.error("Please enter a username");
                return;
            }
            
            if (password === '') {
                toast.error("Please enter a password");
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
                            // tmp
                            basic_info: false,
                            username: username,
                            token: token
                        })
                    );

                    // Redirect to data overview page
                    history('/data-overview');

                } else {
                    const msg = response.data.msg;
                    toast.error("Login failed: " + msg);
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
            <ToastContainer
                position="top-center"
                autoClose={5000} 
                hideProgressBar={true} 
                newestOnTop={true} 
                closeOnClick 
                pauseOnHover 
                theme="light"
            />
            <div className='login-panel'>
                <img className='logo' src='./images/logo.png' alt='ECHO_TCF'></img>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='login-data-container'>
                        <div className='login-data-title'> 
                            Username 
                        </div>
                        <div className='login-data-wrapper'>
                            <MdAccountCircle className='login-icon' />
                            <input className='login-data' type="text" name="username" placeholder="Username" />
                        </div>
                    </div>
                    <div className='login-data-container'>
                        <div className='login-data-title'>
                            Password
                        </div>
                        <div className='login-data-wrapper'>
                            <RiLockPasswordFill className='login-icon'/>
                            <input className='login-data' type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className='login-rember-forget'>
                        <div className='login-rember'>
                            <input 
                                type='checkbox' 
                                id='rember' 
                                name='rember' 
                                onChange={() => setRemember(!remember)} 
                            />
                            <label htmlFor='rember'> Remember me</label>
                        </div>
                        <a 
                            onClick={() => {
                                toast.info(
                                    <div>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                                    </div>,
                                    { autoClose: false, closeOnClick: true }
                                );
                            }}
                        >
                            Forgot password?
                        </a>
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
