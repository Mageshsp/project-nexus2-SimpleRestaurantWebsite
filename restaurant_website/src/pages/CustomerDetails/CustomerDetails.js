import React, { useEffect, useState } from 'react'
import './CustomerDetails.css'
import { useNavigate } from 'react-router-dom';
const CustomerDetails = () => {
    const navigate = useNavigate();
    function logoutFn(){
        console.log("logout");
        navigate("/");
        window.location.reload();
    }
  return (
    <>
        <form className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-field'>
                    <input type='text' placeholder='First Name' required />
                    <input type='text' placeholder='last Name'/>
                </div>
                <input type='email' placeholder='Email address' required />
                <input type='text' placeholder='Street' required/>
                <div className='multi-field'>
                    <input type='text' placeholder='City' required/>
                    <input type='text' placeholder='State' required/>
                </div>
                <div className='multi-field'>
                    <input type='text' placeholder='Pin code' required/>
                    <input type='text' placeholder='Country' required/>
                </div>
                <input type='number' placeholder='Phone' required/>

            </div>
        </form>
        <button className='logout-btn' onClick={logoutFn}>Logout</button>
    </>
  )
}

export default CustomerDetails