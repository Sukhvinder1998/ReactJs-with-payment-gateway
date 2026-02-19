import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Logout from '../auth/LogOut';

function Orders({ siteUrl }) {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const updateUserName = () => {
            const storedUserName = localStorage.getItem('userName');
            setUserName(storedUserName || '');
            const storedUserEmail = localStorage.getItem('userEmail');
            setUserEmail(storedUserEmail || '');
            
        };
        updateUserName();
        window.addEventListener('userNameUpdated', updateUserName);
        return () => {
            window.removeEventListener('userNameUpdated', updateUserName);
        };
    }, []);


    useEffect(() => {
        const fetchEntries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${siteUrl}/wp-json/crm/v1/cf7-entries`,
                    {
                        params: { user_email: userEmail }, // Send form ID as query parameter
                    }
                );
                setEntries(response.data);
            } catch (err) {
                setError('Error fetching form entries');
                setEntries([]);
                console.error(err);
            } finally {
                setLoading(false); // Loading finished
            }
        };

        if (userEmail) {
            fetchEntries();
        }
    }, [userEmail]);
    console.log(entries);
    if (loading) {
        return <p>Loading...</p>; // Show loading indicator
    }
  return (
    <>
        <section className="account_sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="account_hdng">Event Order Details</h2>
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
                                        <Link to="/orders" class="active">Orders</Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/change-password">Change Password</Link>
                                    </li> */}
                                      <li><Logout/></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-12">
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="table-wrapping">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Event</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                      {Object.keys(entries).map((entryId,index) => (
                                          <tr key={index}>
                                              <td>#{index + 1}</td>
                                              <td>{entries[entryId]?.['event-name'] || "N/A"}</td>
                                              <td> {entries[entryId]?.['payment-id'] !== 0 ? "Success" : "Cancelled"}</td>
                                    </tr>
                                      ))}                              

                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    </>
  );
}

export default Orders;
