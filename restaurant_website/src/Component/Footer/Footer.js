import React from 'react'
import { Link } from 'react-router-dom';
import {assets } from '../../assets/assets';
import './Footer.css'
export const Footer = ({menu, setmenu}) => {
  return (
    <div className='footer'>
    <div className='footer-left'>
        <img className='footer-logo' src={assets.logo} alt='Delish Logo' />
        <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='Facebook' />
            <img src={assets.twitter_icon} alt='Twitter' />
        </div>
    </div>

    <div className='footer-container'>
        <div className='footer-menu'>
            <span><Link to='/TermsAndCondition' onClick={() => setmenu("Terms")} className={menu === "TermsAndCondition" ? "active" : ""}>Terms and Condition</Link></span>
            <span><Link to='/PrivacyPolicy' onClick={() => setmenu("Privacy")} className={menu === "PrivacyPolicy" ? "active" : ""}>Privacy policy</Link></span>
            <span><Link to='/ContactUs' onClick={() => setmenu("ContactUs")} className={menu === "ContactUs" ? "active" : ""}>Contact Us</Link></span>
        </div>
    </div>

    <div className='footer-content-contact'>
        <ul>
            <li>+91 8778676679</li>
            <li>contact@delish.com</li>
        </ul>
    </div>

    <hr />
    <p className='footer-copyright'>
        Copyright 2024 &copy; Delish.com - All Rights Reserved.
    </p>
</div>
  )
}
