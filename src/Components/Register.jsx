import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { loginAndLoading } from 'States/actions.js';
import { useDispatch } from 'react-redux';
import { UserRegister } from 'Utilities/ApiServices.js';
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import './Register.css';

function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const passwordConfirm = event.target.elements['password-confirm'].value;
        const email = event.target.elements.email.value;
        
        if (username === '') {
            alert("Please enter a username");
            return;
        }

        if (password === '') {
            alert("Please enter a password");
            return;
        }

        if (password !== passwordConfirm) {
            alert("Passwords do not match");
            return;
        }

        if (email === '') {
            alert("Please enter an email");
            return;
        }

        UserRegister(username, password, email).then((response) => {
            if (response.data.code === 0) {
                alert("Registration successful");

                // Redirect to login page
                window.location.href = '/login';

            } else {
                const msg = response.data.msg;
                alert("Registration failed: " + msg);
            }
        }).catch((error) => {
            console.error('Error Register:', error);
        });
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
                            <input className='register-data' type="password" name="password-confirm" placeholder="Confirm Password" />
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
