import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img className='footer-logo' src={assets.logo}/>
                <p>At Delish, we’re passionate about serving fresh, flavorful dishes that delight your taste buds. From our kitchen to your table, every meal is prepared with the finest ingredients and a touch of love. Whether you're dining in or ordering out, Delish promises an unforgettable culinary experience.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}/>
                    <img src={assets.twitter_icon}/>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8778676679</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 &copy; Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer