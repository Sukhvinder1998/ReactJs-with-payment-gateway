//StripePayment.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe outside of a component for performance optimization
const stripePromise = loadStripe("pk_test_51QWcqiSHszh1D4vFlvAfVme4sCHQSuPzo6R6oZbTNgkQi7EsL7JFsINnaTt6RhvkY8jBOELcaT03Rq6Jtoqg04Wa00rwnB82lz");


const CheckoutForm = ({ clientSecret, userDetails, siteUrl, dataMatch }) => {
    console.log(dataMatch);
    
    const baseUrl = new URL(siteUrl).origin;
    const PAYMENT_SUCCESS_URL = `${baseUrl}/success`;   
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Save userDetails to sessionStorage before confirming the payment
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
        sessionStorage.setItem('dataMatch', JSON.stringify(dataMatch));
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: PAYMENT_SUCCESS_URL },
        });
        setMessage(error ? `Error: ${error.message}`:'');
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="submitWrapper mt-4">
            <button disabled={isLoading || !stripe || !elements}>
                {isLoading ? "Loading..." : "Pay Now"}
            </button>
            </div>
            {message && <div>{message}</div>}
        </form>
    );
};

const StripeCheckout = ({ eventDetails ,siteUrl }) => {
    
    const { eventname, eventid } = eventDetails;
    
    const [clientSecret, setClientSecret] = useState("");
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
           // console.log(data);
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

        // Combine them with hyphens
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
        tshirt: "",
        eventname: eventname,
        eventid: eventid,
        userid: '',
        token: '',
        
    });
    useEffect(() => {
        if (eventname && eventid) {
            setUserDetails(prev => ({
                ...prev,
                eventname: eventname,
                eventid: eventid,
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
                userid: prepopulatedUserData.id,
                token: usertoken,
            }));
        }
    }, [eventname, eventid, prepopulatedUserData, loginUserData, userEmail]);
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const createPaymentIntent = async () => {
        const { data } = await axios.post("https://server-jgvv.onrender.com/create-payment-intent", {
            items: [{ name: "momos", amount: 40.0 }],
            customerDetails: userDetails,
        });
        setClientSecret(data.clientSecret);
    };

    console.log(usertoken);
    
    // console.log('userdata');
    
    //console.log(loginUserData);
     //console.log(userDetails);
    // console.log(prepopulatedUserData);
    
    // compare userDetails and loginUserData

    const keyMapping = {
        bloodgroup: "blood_group",
        pin_code: "postal_code",
        tshirt: "t_shirt",
        whatsapp: "whatsapp_number",
        emergencyname: "emergency_name",
        emergencynumber: "emergency_number",
        dob: "date",
    };

    const excludedKeys = ["name", "email", "eventid", "eventname"];

    // Normalize object keys based on the mapping
    const normalizeObject = (obj, mapping) => {
        const normalized = {};
        Object.keys(obj).forEach((key) => {
            const mappedKey = mapping[key] || key; // Use mapped key if exists
            normalized[mappedKey] = obj[key];
        });
        return normalized;
    };

    // Compare two normalized objects
    const compareObjects = (obj1, obj2, excludedKeys) => {
        for (const key in obj1) {
            // Skip excluded keys
            if (excludedKeys.includes(key)) {
                continue;
            }

            const value1 = obj1[key];
            const value2 = obj2[key];
            const normalizedValue1 =
                key === "date"
                    ? value1?.toString().replace(/-/g, "") 
                    : value1?.toString().toLowerCase().trim();
            const normalizedValue2 =
                key === "date"
                    ? value2?.toString().replace(/-/g, "") 
                    : value2?.toString().toLowerCase().trim();   
            if (normalizedValue1 !== normalizedValue2) {
                return false; 
            }
        }
        return true;
    };

    // Normalize the objects
    const normalizedObject1 = normalizeObject(loginUserData, keyMapping);
    const normalizedObject2 = normalizeObject(userDetails, keyMapping);
    
    // Compare the normalized objects
    const isSame = compareObjects(normalizedObject1, normalizedObject2, excludedKeys);
    
        const [dataMatch, setdataMatch] = useState('');
        useEffect(() => {
            if (loginUserData) {
            if (isSame) {
                setdataMatch('DataMatch');
            } else {
                setdataMatch('DataNotMatch');
            }
        }
        }, [loginUserData, isSame]);
    
    // console.log(dataMatch);
       
    
    
// Data compare code end here 
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        createPaymentIntent();
    };
    
    return (
        <div className="paymentForm">
            <div className="container">
                {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit}>
                        <h2 className="form_hdng">Enter Your Details</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled 
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
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
                                        type="number"
                                        name="phone"
                                        value={userDetails.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Whatsapp</label>
                                    <input
                                        type="number"
                                        name="whatsapp"
                                        value={userDetails.whatsapp}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={userDetails.gender}
                                        onChange={handleInputChange}
                                        required
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
                                        type="date"
                                        name="dob" // 'dob' will be the key in userDetails
                                        value={userDetails.dob} // Controlled value
                                        onChange={handleInputChange} // Update state
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={userDetails.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={userDetails.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={userDetails.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Postal Code</label>
                                    <input
                                        type="text"
                                        name="pin_code"
                                        value={userDetails.pin_code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Country</label>
                                    <select
                                        name="country"
                                        value={userDetails.country}
                                        onChange={handleInputChange}
                                        required
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
                                        name="bloodgroup"
                                        value={userDetails.bloodgroup}
                                        onChange={handleInputChange}
                                        required
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
                                        type="text"
                                        name="emergencyname"
                                        value={userDetails.emergencyname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Emergency Number</label>
                                    <input
                                        type="number"
                                        name="emergencynumber"
                                        value={userDetails.emergencynumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>T-Shirt</label>
                                    <select
                                        name="tshirt"
                                        value={userDetails.tshirt}
                                        onChange={handleInputChange}
                                        required
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
                                <div className="submitWrapper">
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>


                ) : !clientSecret ? (
                    <div>Loading payment details...</div>
                ) : (
                            <Elements stripe={stripePromise} options={{ clientSecret }} siteUrl={siteUrl} >
                                {/* Pass userDetails as a prop to CheckoutForm */}
                                <CheckoutForm clientSecret={clientSecret} userDetails={userDetails} siteUrl={siteUrl} dataMatch={dataMatch} />
                    </Elements>
                )}

            </div>

        </div>
    );
};

export default StripeCheckout;
