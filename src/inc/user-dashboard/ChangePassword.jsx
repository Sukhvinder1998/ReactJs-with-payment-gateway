import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logout from '../auth/LogOut';
// import GlobalComp from '../global/globalComponent';

function ChangePassword() {
    const [userName, setUserName] = useState('');
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
  return (
    <>
        <section className="account_sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="account_hdng">My Account</h2>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="user">
                                    <div className="user_figure">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/profile.png" className="img-fluid" alt="profile"/>
                                    </div>
                                    <div className="user_desc">
                                        <p>Hello,</p>
                                          <h5 className="user_hdng">{userName}</h5>
                                    </div>
                                </div>

                                <ul>
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orders">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/change-password" class="active">Change Password</Link>
                                    </li>
                                      <li><Logout/></li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-12">
                        <form action="#">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="form-group">
                                          <h4 className="change_hdng">Password Change</h4>
                                        <label for="password">New Password (leave blank unchanged)</label>
                                        <input type="password" className="form-control" placeholder="" id="password" />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label for="password">Confirm new password</label>
                                        <input type="password" className="form-control" placeholder="" id="password" />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-btn">
                                        <button type="button">Change Password</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </section>
    </>
  );
}

export default ChangePassword;
