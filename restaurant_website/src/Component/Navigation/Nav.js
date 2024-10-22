import React, { useContext, useEffect,  NavLink } from 'react'
import './Nav.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Nav = ({setlogin,isLogged,menu, setmenu}) => {
   
    const {getTotalAmount}=useContext(StoreContext);

    useEffect(()=>{
      const web=window.location.href;
      setmenu(web);
    },[menu])
    console.log(menu)

  return (
    <>
      <div className='navbar' >
        <Link to='/'>< img src={assets.logo} onClick={()=>setmenu("Home")} className='logo' /></Link>
          <ul className='navbar-menu'>
              <Link to='/' onClick={()=>setmenu("Home")} className={menu==="http://localhost:3000/"?"active":""}>Home</Link>
              <Link to='/Menu' onClick={()=>setmenu("Menu")} className={menu==="http://localhost:3000/Menu"?"active":""} >Menu</Link>
              <Link to='/Contact' onClick={()=>setmenu("Contact")} className={menu==="http://localhost:3000/Contact"?"active":""}>Contact us</Link>
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
    </>
  )
}

export default Nav