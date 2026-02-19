import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ImgCompo from '../global/singleImage';
import { Link } from "react-router-dom";
function Footer({ siteUrl }) {
    const [FooterItem, setFooterItems] = useState([]);
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
                    setFooterItems(items);
    
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
    
            fetchAllData();
        }, []);
       // console.log(FooterItem);
    return (
        <>
            <footer className="site_footer pt_100">
                {FooterItem.map((item,index) => (
                <div className="container" key={index}>
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <div className="footer_logo_wrap">
                                    <h2 className="g-hdng footer_logo"><Link style={{ color: "#000" }} to="/"> <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/small-logo-main.png" alt="logo" /></Link></h2>
                                    <p>{item.footer.description}</p>
                                <div className="social">
                                    <p>Follow us on</p>
                                        {item.social_icons.map((social_icon,index) => ( 
                                            <a href="{social_icon.icon_url}" key={index} target='_blank'
                                            ><ImgCompo siteUrl={siteUrl} ImageId={social_icon.icon.ID} /></a>
                                        ))}
                                    {/* <a href="https://www.instagram.com/techmindsoftwares/" target='_blank'
                                    ><img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/footer_instagram.svg" alt="instagram"
                                        /></a>
                                    <a href="https://twitter.com/techmindindia" target='_blank'
                                    ><img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/footer_twiter.svg" alt="twitter"
                                        /></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="inner_wrap">
                                <div className="footer_menus">
                                    <div className="inner_row">
                                        <div className="inner_wrap">
                                            
                                        </div>
                                        <div className="inner_wrap">
                                           
                                        </div>
                                        <div className="inner_wrap">
                                            <h4 className="title">Quick links</h4>
                                            <ul>
                                                {item.footer_page_urls.map((page,index) => (
                                                    <li key={index}><Link to={page.link.split('/').filter(Boolean).pop()}>{page.link.split('/').filter(Boolean).pop().toUpperCase() }</Link></li>
                                                ))}
                                                {/* <li><Link to="/blogs">Blogs</Link></li>
                                                <li><Link to="/events">Events</Link></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom_footer">
                                    <div className="coyprights">
                                        <p>© 2023 Bookmyevent Powered by <a href="https://techmind.co.in/" target="_blank">Techmind Softwares</a></p>
                                        <div className="bottom_links">
                                            <a href="https://techmind.co.in/terms-conditions/" target='_blank'>Terms & Conditions</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </footer>
        </>
    );
}

export default Footer;
