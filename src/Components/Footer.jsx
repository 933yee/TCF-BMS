import React from 'react';

import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <div className='information-container'>
                <div className='information-left'>
                    <img className='information-logo' src='./images/ECHO_TCF.png'></img>
                </div>
                <div className='information-right'>
                    <div className='contact'>聯絡我們</div>
                    <div className='email'>
                        <span style={{ marginRight: '.5rem' }}><FaEnvelope /></span> Email: <a href='mailto:a9648124@gmail.com'> a9648124@gmail.com</a>
                    </div>
                    <div className='phone'>
                        <span style={{ marginRight: '.5rem' }}><FaPhoneAlt /></span> 電話: 0970641090
                    </div>
                </div>
            </div>
            <div className='copyright'>© 2024 Copyright ECHO</div>
        </div>
    );
}

export default Footer;
