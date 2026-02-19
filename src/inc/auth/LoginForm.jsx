import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
// useNavigate is used for redirect the user after successful login


function LoginForm({ siteUrl }) {    
    const [getInputValues, holdInputValues] = useState({
        eMail: '',
        pWord: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [responseClass, setResponseClass] = useState('');
    const [loader, setLoader] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirects
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        navigate('/profile'); // Redirect to dashboard if token exists
        }
    }, [navigate]);
    const GetInputEvent = (event) => {
        const { name, value } = event.target;
        holdInputValues((prevVal) => {
            //console.log(prevVal);
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
        setLoader(true);
        setResponseMessage(false);

        // Simple Form Validation 
        if(getInputValues.eMail == ''){
            setResponseMessage("Please enter username");
            if(getInputValues.pWord == ''){
                setResponseMessage("Please enter username and password");
            }
            setResponseClass('alert-danger');
            setLoader(false);
            return;
        }else if(getInputValues.pWord == ''){
            setResponseMessage("Please enter password");
            if(getInputValues.eMail == ''){
                setResponseMessage("Please enter username and password");
            }
            setResponseClass('alert-danger');
            setLoader(false);
            return;
        }
        



        try {
            const response = await axios.post(`${siteUrl}wp-json/jwt-auth/v1/token`, {
                username: getInputValues.eMail,
                password: getInputValues.pWord,
            });
            console.log(response);
            
            localStorage.setItem('token', response.data.token); // Save the JWT token
            localStorage.setItem('userName', response.data.user_display_name);
            localStorage.setItem('userEmail', response.data.user_email);
            window.dispatchEvent(new Event('userNameUpdated'));
            setResponseMessage('Login Successfull');
            setLoader(false);
            // Redirect to dashboard after login
            navigate('/profile'); // redirects user
        } catch (error) {
            // console.error('Login failed', error.response.data);
            setLoader(false);
            setResponseMessage('Invalid username or password.');
            setResponseClass('alert-danger');
        }
    }
    return (
        <>
            <section className="common_banner_section pt_100 pb_100">
                <div className="common_banner_section_wrap">
                    <div className="container">
                        <div className="banner_heading">
                            <h1 className="hdng fs_55">Login</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact_us_section pt_100 pb_100">
                <div className="contact_us_section_wrap">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form className="form_wrap" onSubmit={onSubmitForm}>
                                    <div className="ap_form">

                                        <div className="col-12">
                                            <input type="text" placeholder="Email" value={getInputValues.eMail} name="eMail" onChange={GetInputEvent} />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" placeholder="password" value={getInputValues.pWord} name="pWord" onChange={GetInputEvent} />
                                        </div>
                                        <div className="col-12">
                                            <div className="submitWrapper">
                                                <input type="submit" value="Login" />
                                                {loader &&
                                                    <div className="loaderWrap">
                                                        <span className="loader"></span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        
                                        {responseMessage && <div className="col-12 col-md-12 mt-4"><div className={`alert ${responseClass}`}>{responseMessage}</div></div>}

                                            
                                        <div className="col-12 col-md-6">
                                            <p class="formUnderMessage">Don’t have an account? ? <Link to="/register">Sign up here</Link></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12">
                                <div className="iframe_wrap pt_100">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9017942518904!2d76.84109707621825!3d30.66489378890703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f94bc0584373d%3A0x4de8e87e82660f72!2sTechmind%20Softwares!5e0!3m2!1sen!2sin!4v1733373705222!5m2!1sen!2sin" frameBorder="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default LoginForm;
