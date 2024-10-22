import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({menu, setmenu}) => {
  // const load=()=>{
  //   window.location.reload(false);
  // }
  return (
    <div className='header'>
        <div className='header-content'>
            <h2>Order your favourite food here..</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredient.</p>
           <button ><Link to='/Menu'onClick={()=>setmenu("Menu")}  >View Menu </Link></button>
        </div>
    </div>
  )
}

export default Header