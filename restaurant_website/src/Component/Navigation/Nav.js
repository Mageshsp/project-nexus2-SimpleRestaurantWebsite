import React, { useContext, useState } from 'react'
import './Nav.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Nav = ({setlogin,isLogged}) => {
    const [menu,setmenu]=useState("Home");
    const {getTotalAmount}=useContext(StoreContext);
  return (
    <div className='navbar'>
       <Link to='/Home'><img src={assets.logo} className='logo' /></Link>
        <ul className='navbar-menu'>
            <Link to='/Home' onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
            <a href='#explor-menu' onClick={()=>setmenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={()=>setmenu("Contact")} className={menu==="Contact"?"active":""}>Contact us</a>
        </ul>
        <div className='navbar-right'>
            <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon} /></Link>
                <div className={getTotalAmount()===0?"":"dot"}></div>
            </div>
            {isLogged?(
              <Link to='/Profile'> <img className='profile' src={assets.profile_icon} /> </Link>)
              :<button onClick={()=>setlogin(true)}>Sign in</button>}
            
        </div>
    </div>
  )
}

export default Nav