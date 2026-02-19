import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
//import module
import { Helmet } from 'react-helmet-async';


function RegisterForm({ siteUrl }) {  
    const [responseMessage, setResponseMessage] = useState('');
    const [responseClass, setResponseClass] = useState('');
    const [loader, setLoader] = useState(''); 
    const navigate = useNavigate(); // Initialize useNavigate for redirects   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        navigate('/dashboard'); // Redirect to dashboard if token exists
        }
    }, [navigate]); 
    const [getInputValues, holdInputValues] = useState({
        uName: '',
        fName: '',
        lName: '',
        eMail: '',
        pHone: '',
        pWord: '',
        cpWord: ''
    }); 
    
    const GetInputEvent = (event) => {
        const { name, value } = event.target;
        holdInputValues((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }

    function removeAllErrors() {
        setResponseMessage(false);
        setResponseClass(false);
        setLoader(false);
    }

    function redirectAfterFewSec() {
        navigate('/login');
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        setLoader(true);

        // normal validation form field on the basis of empty
        for (let x in getInputValues) {
            if(!getInputValues[x]){
                setResponseMessage("Please fill all fields");
                setResponseClass("alert-danger");
                setLoader(false);
                setTimeout(removeAllErrors, 4000);
                return;
            }
        }

        // check if password and confirm password is same or not
        if(getInputValues.pWord !== getInputValues.cpWord){
            setResponseMessage("Password and Confirm Password is not same");
            setResponseClass("alert-danger");
            setTimeout(removeAllErrors, 4000);
            setLoader(false);
            return;
        }

        // axios
        try {
            const auth = btoa('main_admin:Ze5L lZ7I aOeb kmIc jD3c DZB9'); // Replace with your admin username and application password
            await axios.post(`${siteUrl}wp-json/wp/v2/users`, {
                username: getInputValues.uName,
                email: getInputValues.eMail,
                first_name: getInputValues.fName,
                last_name: getInputValues.lName,
                password: getInputValues.pWord,
                father_name: 'test',
                acf: {
                    field_6763b4077a3dc: 'dasg', 
                },
                // acf[field_6763b4077a3dc]: 'dasg',
                // roles: ['administrator'],
            },
            {
              headers: {
                Authorization: `Basic ${auth}`,
              },
            });
            setResponseMessage('Signup successful! You can now login.');
            setResponseClass("alert-success");
            setLoader(false);
            setTimeout(redirectAfterFewSec, 3000);
          } catch (error) {
            setResponseMessage('Signup Failed - Please try again');
            setResponseClass('alert-danger');
            setTimeout(removeAllErrors, 4000);
            setLoader(false);
            //console.error('Signup failed', error.response.data);
            //alert('Error signing up: ' + error.response.data.message);
        }
    }
    return (
        <>
            <Helmet>
                <title>Register Page - Book my event</title>
                <meta name="description" content="This is the contactpage of Bookmyevent." />
            </Helmet>
            <section className="common_banner_section pt_100 pb_100">
                <div className="common_banner_section_wrap">
                    <div className="container">
                        <div className="banner_heading">
                            <h1 className="hdng fs_55">Register</h1>
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
                                            
                                        {responseMessage && <div className="col-12 col-md-12 mt-4"><div className={`alert ${responseClass}`}>{responseMessage}</div></div>}

                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <input type="text" placeholder="First name" value={getInputValues.fName} name="fName" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input type="text" placeholder="Last Name" value={getInputValues.lName} name="lName" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-12">
                                                <input type="text" placeholder="Username" value={getInputValues.uName} name="uName" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input type="email" placeholder="Email" value={getInputValues.eMail} name="eMail" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input type="tel" placeholder="Phone" value={getInputValues.pHone} name="pHone" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input type="password" placeholder="Password" value={getInputValues.pWord} name="pWord" onChange={GetInputEvent} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input type="password" placeholder="Confirm Password" value={getInputValues.cpWord} name="cpWord" onChange={GetInputEvent} />
                                            </div>
                                            
                                            <div className="col-12">
                                                <div className="submitWrapper">
                                                    <input type="submit" value="Signup" />
                                                    {loader &&
                                                        <div className="loaderWrap">
                                                            <span className="loader"></span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <p class="formUnderMessage">Already have an account ? <Link to="/login">Log in here</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default RegisterForm;
