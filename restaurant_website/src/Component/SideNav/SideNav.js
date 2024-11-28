import React, { useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

export const SideNav = ({ menu, setmenu ,closeSideNav}) => {
    const sideNavRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                closeSideNav();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeSideNav]);
    return (
        <nav  className='sidenav' ref={sideNavRef}>
            <div className='sidenav-container'>
                <ul className="sidenavbar-menu">
                    <li>
                        <Link
                            to="/"
                            onClick={() => setmenu("Home")}
                            className={menu === "Home" || menu === "" ? "active" : ""}
                            aria-current={menu === "Home" ? "page" : undefined}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Menu"
                            onClick={() => setmenu("Menu")}
                            className={menu === "Menu" ? "active" : ""}
                            aria-current={menu === "Menu" ? "page" : undefined}
                        >
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/AboutUs"
                            onClick={() => setmenu("AboutUs")}
                            className={menu === "AboutUs" ? "active" : ""}
                            aria-current={menu === "AboutUs" ? "page" : undefined}
                        >
                            About us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};