import React, { useContext } from 'react';
import './Nav.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Nav = ({ setlogin, isLogged, menu, setmenu, handleLogout,toggleSideNav }) => {

  const { getTotalAmount } = useContext(StoreContext);

  return (
    <>
      <div className="navbar">
        <div className='sidenavdiv'>
          <img src={assets.more} alt='sidenav' className='sidenavimg' onClick={toggleSideNav}/>
          <Link to="/" onClick={() => setmenu("Home")}>
            <img src={assets.logo} className="logo" alt="Logo" />
          </Link>
        </div>

        <ul className="navbar-menu">
          <span>
            <Link to="/" onClick={() => setmenu("Home")} className={menu === "Home" || menu === "" ? "active" : ""}>Home</Link>
          </span>
          <span>
            <Link to="/Menu" onClick={() => setmenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</Link>
          </span>
          <span>
            <Link to="/AboutUs" onClick={() => setmenu("AboutUs")} className={menu === "AboutUs" ? "active" : ""}>About us</Link>
          </span>
        </ul>
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <Link to="/cart" onClick={() => setmenu("cart")} className={menu === "cart" ? "active" : ""}>
              <img className="basket" src={assets.basket_icon} alt="Cart Icon" />
              <div className="cart-tooltip">Cart</div>
            </Link>
            <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
          </div>

          {isLogged ? (
            <>
              <div className="navbar-search-icon profile-container">
                <Link to="/Profile" onClick={() => setmenu("Profile")} className={menu === "Profile" ? "active" : ""}>
                  <img className="profile" src={assets.profile_icon} alt="Profile Icon" />
                  <div className="cart-tooltip">Profile</div>
                </Link>
              </div>

              <div className="navbar-search-icon logout-container">
                <button className="logoutbtn" onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="Logout Icon" />
                  <div className="cart-tooltip">Logout</div>
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => setlogin(true)} className="signinbtn">Sign in</button>
          )}
        </div>
      </div></>
  );
};

export default Nav;