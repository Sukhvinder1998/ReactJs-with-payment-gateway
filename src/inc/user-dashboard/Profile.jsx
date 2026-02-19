import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logout from '../auth/LogOut';
import axios from "axios";
// import GlobalComp from '../global/globalComponent';

function Profile({ siteUrl }) {
    const [isEditable, setIsEditable] = useState(false);
     const [responseMessage, setResponseMessage] = useState('');
        const [responseClass, setResponseClass] = useState('');
        const [loader, setLoader] = useState(''); 
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

        const [loginUserData, setLoginUserData] = useState("");
            const [prepopulatedUserData, setprepopulatedUserData] = useState("");
        
            // Get Login user data 
            const [usertoken, setUserToken] = useState('');
            const [userEmail, setUserEmail] = useState('');
            useEffect(() => {
                const updateUserName = () => {
                    const storedtoken = localStorage.getItem('token');
                    setUserToken(storedtoken || '');
                    const storedemail = localStorage.getItem('userEmail');
                    setUserEmail(storedemail || '');
                };
                updateUserName();
                window.addEventListener('userNameUpdated', updateUserName);
                return () => {
                    window.removeEventListener('userNameUpdated', updateUserName);
                };
            }, []);
            const findUserDetails = async () => {
                try {
                    const { data } = await axios.get(`${siteUrl}/wp-json/wp/v2/users/me`, {
                        headers: {
                           Authorization: `Bearer ${usertoken}`,
                        },
                    });
                    //console.log(data);
                    
                    setprepopulatedUserData(data);
                    setLoginUserData(data.acf);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            useEffect(() => {
                if (usertoken != '') {
                    findUserDetails();
                }
            }, [usertoken]);
            const convertDate = (dateString) => { 
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (dateRegex.test(dateString)) {
                    return dateString;
                }
                  
                if(dateString != null){
                const year = dateString.substring(0, 4);
                const month = dateString.substring(4, 6);
                const day = dateString.substring(6, 8);
                return `${year}-${month}-${day}`;
                }
            };
            const [userDetails, setUserDetails] = useState({
                name: "",
                email: "",
                phone: "",
                whatsapp: "",
                gender: "",
                dob: "",
                address: "",
                city: "",
                state: "",
                pin_code: "",
                country: "",
                bloodgroup: "",
                emergencyname: "",
                emergencynumber: "",
                tshirt: ""
                
            });
            useEffect(() => {
                    setUserDetails(prev => ({
                        ...prev,
                        name: prepopulatedUserData.name,
                        email: userEmail,
                        phone: loginUserData.phone,
                        whatsapp: loginUserData.whatsapp_number,
                        gender: loginUserData.gender,
                        dob: convertDate(loginUserData.date),
                        address: loginUserData.address,
                        city: loginUserData.city,
                        state: loginUserData.state,
                        pin_code: loginUserData.postal_code,
                        country: loginUserData.country,
                        bloodgroup: loginUserData.blood_group,
                        emergencyname: loginUserData.emergency_name,
                        emergencynumber: loginUserData.emergency_number,
                        tshirt: loginUserData.t_shirt,
                    }));
                
            }, [prepopulatedUserData, loginUserData, userEmail]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        if (!isEditable) return;
        setLoader(true);
        try {
            await axios.post(`${siteUrl}wp-json/wp/v2/users/${prepopulatedUserData.id}`, {
        name: userDetails.name,
                acf: {
                    field_6763b99ffec4d: userDetails.address,
                    field_6763b91bfec4b: userDetails.gender,
                    field_6763b95ffec4c: userDetails.dob,
                    field_6763b9aefec4e: userDetails.city,
                    field_6763b9b7fec4f: userDetails.state,
                    field_6763b9cefec51: userDetails.country,
                    field_6763b9c2fec50: userDetails.pin_code,
                    field_6763ba5ffec52: userDetails.bloodgroup,
                    field_6763baebfec53: userDetails.emergencyname,
                    field_6763baf9fec54: userDetails.emergencynumber,
                    field_6763c144d8d8a: userDetails.phone,
                    field_6763c155d8d8b: userDetails.whatsapp,
                    field_6763bb0bfec55: userDetails.tshirt
                },
            },
                {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
            setResponseMessage('Detail Updated successful!');
            setResponseClass("alert-success"); 
            setLoader(false);      
        } catch (error) {
            setResponseMessage('Detail Updated Failed - Please try again');
            setResponseClass('alert-danger');
            setLoader(false);
            console.error('Signup failed', error.response.data);
            alert('Error signing up: ' + error.response.data.message);
        }
        }
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
                                        <Link to="/profile" class="active">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orders">Orders</Link>
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
                        <div className="edit_btn_wrap">
                          <button
                              type="button"
                              className="edit_btn mb-3"
                              onClick={() => setIsEditable(true)}
                          >
                              Edit
                          </button>
                          </div>
                          <form onSubmit={onSubmitForm}>
                              <div className="row">
                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Name</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="name"
                                              value={userDetails.name}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Email</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="email"
                                              value={userDetails.email}
                                              onChange={handleInputChange}
                                              required
                                              disabled
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Phone</label>
                                          <input
                                              className="form-control"   
                                              type="number"
                                              name="phone"
                                              value={userDetails.phone}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Whatsapp</label>
                                          <input
                                              className="form-control"   
                                              type="number"
                                              name="whatsapp"
                                              value={userDetails.whatsapp}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Gender</label>
                                          <select
                                              className="form-select"
                                              name="gender"
                                              value={userDetails.gender}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          >
                                              <option value="">Select your Gender</option>
                                              <option value="MALE">MALE</option>
                                              <option value="FEMALE">FEMALE</option>
                                              <option value="OTHER">OTHER</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Date of Birth</label>
                                          <input
                                              className="form-control"   
                                              type="date"
                                              name="dob" // 'dob' will be the key in userDetails
                                              value={userDetails.dob} // Controlled value
                                              onChange={handleInputChange} // Update state
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Address</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="address"
                                              value={userDetails.address}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>City</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="city"
                                              value={userDetails.city}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>State</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="state"
                                              value={userDetails.state}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>


                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Postal Code</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="pin_code"
                                              value={userDetails.pin_code}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Country</label>
                                          <select
                                              className="form-select"
                                              name="country"
                                              value={userDetails.country}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          >
                                              <option value="">Select your Country</option>
                                              <option value="IN">India</option>
                                              <option value="US">United States</option>
                                              <option value="JP">Japan</option>
                                              <option value="AU">Australia</option>
                                              <option value="CA">Canada</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Blood Group</label>
                                          <select
                                              className="form-select"
                                              name="bloodgroup"
                                              value={userDetails.bloodgroup}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          >
                                              <option value="">Select your Blood Group</option>
                                              <option value="A+">A+</option>
                                              <option value="A-">A-</option>
                                              <option value="B+">B+</option>
                                              <option value="B-">B-</option>
                                              <option value="AB+">AB+</option>
                                              <option value="AB-">AB-</option>
                                              <option value="O+">O+</option>
                                              <option value="O-">O-</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Emergency Name</label>
                                          <input
                                              className="form-control"   
                                              type="text"
                                              name="emergencyname"
                                              value={userDetails.emergencyname}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>

                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Emergency Number</label>
                                          <input
                                              className="form-control"   
                                              type="number"
                                              name="emergencynumber"
                                              value={userDetails.emergencynumber}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          />
                                      </div>
                                  </div>


                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>T-Shirt</label>
                                          <select
                                              className="form-select"
                                              name="tshirt"
                                              value={userDetails.tshirt}
                                              onChange={handleInputChange}
                                              required
                                              disabled={!isEditable}
                                          >
                                              <option value="">Select your T-Shirt</option>
                                              <option value="XS">XS</option>
                                              <option value="S">S</option>
                                              <option value="M">M</option>
                                              <option value="L">L</option>
                                              <option value="XL">XL</option>
                                              <option value="XXL">XXL</option>
                                              <option value="XXXL">XXXL</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="form-btn submitWrapper">
                                          <button type="submit" disabled={!isEditable}>Save Change</button>
                                          {loader &&
                                              <div className="loaderWrap">
                                                  <span className="loader"></span>
                                              </div>
                                          }
                                      </div>
                                      
                                  </div>
                                  {responseMessage && <div className="col-12 col-md-12 mt-4"><div className={`alert ${responseClass}`}>{responseMessage}</div></div>}
                              </div>
                        </form>
                    </div>


                </div>
            </div>
        </section>
    </>
  );
}

export default Profile;
