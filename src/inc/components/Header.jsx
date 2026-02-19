import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ImgCompo from '../global/singleImage';
import Logout from '../auth/LogOut';
import { Link } from "react-router-dom";
function Header({ siteUrl }) {
    const [userName, setUserName] = useState('');
    const [showMenuState, setMenuState] = useState(false);

    function showMenuFun(){
        setMenuState(true);
    }
    function hideMenuFun(){
        setMenuState(false);
    }


    useEffect(() => {
        const updateUserName = () => {
            const storedUserName = localStorage.getItem('userName');
            setUserName(storedUserName || '');
        };
        updateUserName();
        window.addEventListener('userNameUpdated', updateUserName);
        return () => {
            window.removeEventListener('userNameUpdated', updateUserName);
        };
    }, []);

    const [HeaderItem, setHeaderItems] = useState([]);
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // fetch all Post items
                const response = await axios.get(`${siteUrl}wp-json/acf/v3/options/global-elements`);
                let items;
                if (Array.isArray(response.data)) {
                    items = response.data.map((item) => item);
                } else {
                    // If it's not an array, wrap it in an array
                    items = [response.data];
                }
                setHeaderItems(items);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);
    //console.log(HeaderItem);
    
  return (
    <>
      <header>
            {HeaderItem.map((item,index) => (
                <div className="header_wrap" key={index}>
                    <div className="top_header">
                        <div className="container">
                            <div className="top_header_wrap">
                                <div className="location">
                                    <a href="https://maps.app.goo.gl/fPyMRWFBbuqmb4iU8" target='_blank'> 
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/locations.svg" alt="icon" />
                                        <span>Location</span>
                                    </a>
                                </div>
                                <div className="social_icons">
                                    <ul>
                                        {item.social_icons.map((social_icon,index) => ( 
                                            <li key={index}>
                                                <a href={social_icon.icon_url} target='_blank' >
                                                    <ImgCompo siteUrl={siteUrl} ImageId={social_icon.icon.ID} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom_header">
                        <div className="container">
                            <div className="bottom_header_wrap">
                                <div className="header_logo">
                                    <Link to="/">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/small-logo-main.png" alt="logo" />
                                    </Link>
                                </div>
                                <div className={`header_menu ${showMenuState ? 'show_menu' : ''}`}>
                                    <ul>
                                        <li>
                                            <Link to="/" >Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/events">Events</Link>
                                        </li>
                                        <li>
                                            <Link to="/blog">Blogs</Link>
                                        </li>
                                        <li>
                                            <Link to="/shop" >Shop</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact" >Contact</Link>
                                        </li>
                                        <div className="hide_menu" onClick={hideMenuFun}></div>
                                    </ul>

                                    
                                </div>
                                <div className="mobileMenu">
                                    <div className={`hamburger ${showMenuState ? 'is-active' : ''}`} onClick={showMenuFun}>
                                        <span class="line"></span>
                                        <span class="line"></span>
                                        <span class="line"></span>
                                    </div>
                                </div>
                                <div className="header_button">
                                    <div className="event_btn">
                                        <Link to={userName ? '/profile' : '/login'} className="g-btn g-gradient-btn">{userName ? userName : 'Login'}</Link>
                                    </div>
                                    <div className="admin_btn">
                                        {userName ? <Logout /> : <Link to="/register" className="g-btn g-gradient-btn">Register</Link>}
                                    </div>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </header>
    </>
  );
}

export default Header;
