import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuccessPage = ({ siteUrl }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [dataMatch, setdataMatch] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false); // Prevent multiple submissions
    const navigate = useNavigate();

    const [getInputValues, setInputValues] = useState({
        nAme: "",
        eMail: "",
        pHone: "",
        wHatsapp: "",
        gEnder: "",
        dOb: "",
        aDdress: "",
        cIty: "",
        sTate: "",
        pIn_code: "",
        cOuntry: "",
        bLoodgroup: "",
        eMergencyname: "",
        emergencynumber: "",
        tshirt: "",
        eVentname: "",
        eVentid: "",
        pAymentid: "",
        uSerid: "",
        tOken: "",
    });

    // Retrieve userDetails and paymentDetails
    useEffect(() => {
        const storedUserDetails = sessionStorage.getItem("userDetails");
        const logindataMatch = sessionStorage.getItem("dataMatch");
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
        if (logindataMatch) {
            setdataMatch(JSON.parse(logindataMatch));
        }

        const queryParams = new URLSearchParams(window.location.search);
        const paymentIntent = queryParams.get("payment_intent");
        if (paymentIntent) {
            setPaymentDetails({ ID: paymentIntent });
        }
    }, []);

    // Update input values when both states are ready
    useEffect(() => {
        if (userDetails && paymentDetails && !formSubmitted) {
            setInputValues((prev) => ({
                ...prev,
                nAme: userDetails.name || "",
                eMail: userDetails.email || "",
                pHone: userDetails.phone || "",
                wHatsapp: userDetails.whatsapp || "",
                gEnder: userDetails.gender || "",
                dOb: userDetails.dob || "",
                aDdress: userDetails.address || "",
                cIty: userDetails.city || "",
                sTate: userDetails.state || "",
                pIn_code: userDetails.pin_code || "",
                cOuntry: userDetails.country || "",
                bLoodgroup: userDetails.bloodgroup || "",
                eMergencyname: userDetails.emergencyname || "",
                emergencynumber: userDetails.emergencynumber || "",
                tshirt: userDetails.tshirt || "",
                eVentname: userDetails.eventname || "",
                eVentid: userDetails.eventid || "",
                pAymentid: paymentDetails.ID || "",
                uSerid: userDetails.userid || "",
                tOken: userDetails.token || "",
            }));
            setFormSubmitted(true); // Prevent multiple triggers
        }
    }, [userDetails, paymentDetails, formSubmitted]);

    // Submit form data
    useEffect(() => {
        const onSubmitForm = async () => {
            const endpoint =
                `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/344/feedback`;

            const data = new FormData();
            data.append("your-name", getInputValues.nAme);
            data.append("your-email", getInputValues.eMail);
            data.append("your-phone", getInputValues.pHone);
            data.append("your-whatsapp", getInputValues.wHatsapp);
            data.append("gender", getInputValues.gEnder);
            data.append("Dateofbirth", getInputValues.dOb);
            data.append("your-address", getInputValues.aDdress);
            data.append("your-city", getInputValues.cIty);
            data.append("your-state", getInputValues.sTate);
            data.append("your-pincode", getInputValues.pIn_code);
            data.append("your-country", getInputValues.cOuntry);
            data.append("bloodgroup", getInputValues.bLoodgroup);
            data.append("emergency-name", getInputValues.eMergencyname);
            data.append("emergency-number", getInputValues.emergencynumber);
            data.append("t-shirt", getInputValues.tshirt);
            data.append("event-name", getInputValues.eVentname);
            data.append("event-id", getInputValues.eVentid);
            data.append("payment-id", getInputValues.pAymentid);
            data.append("_wpcf7_unit_tag", "wpcf7-f344-p0-o1");

            try {
                const response = await axios.post(endpoint, data);
                if (response.data.status === "mail_sent") {
                //    second form
                    console.log("success");
                    if (dataMatch == 'DataNotMatch'){
                        // axios
                        console.log('DataNotMatch Update UserDetails In Admin');
                        
                        try {
                            const usertoken = getInputValues.tOken;
                            await axios.post(`${siteUrl}wp-json/wp/v2/users/${getInputValues.uSerid}`, {
                                acf: {
                                    field_6763b99ffec4d: getInputValues.aDdress,
                                    field_6763b91bfec4b: getInputValues.gEnder,
                                    field_6763b95ffec4c: getInputValues.dOb,
                                    field_6763b9aefec4e: getInputValues.cIty,
                                    field_6763b9b7fec4f: getInputValues.sTate,
                                    field_6763b9cefec51: getInputValues.cOuntry,
                                    field_6763b9c2fec50: getInputValues.pIn_code,
                                    field_6763ba5ffec52: getInputValues.bLoodgroup,
                                    field_6763baebfec53: getInputValues.eMergencyname,
                                    field_6763baf9fec54: getInputValues.emergencynumber,
                                    field_6763c144d8d8a: getInputValues.pHone,
                                    field_6763c155d8d8b: getInputValues.wHatsapp,
                                    field_6763bb0bfec55: getInputValues.tshirt
                                },
                            },
                                {
                                    headers: {
                                        Authorization: `Bearer ${usertoken}`,
                                    },
                                });
                        } catch (error) {
                            console.error('Signup failed', error.response.data);
                            alert('Error signing up: ' + error.response.data.message);
                        }

                    }
                    sessionStorage.removeItem('dataMatch');
                    sessionStorage.removeItem('userDetails');
                    setTimeout(() => {
                        navigate("/thankyou"); // Redirect to homepage
                    }, 300);
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }

        };

        if (formSubmitted) {
            onSubmitForm();
        }else{
            navigate("/events");
        }
    }, [formSubmitted, getInputValues, navigate]);

    return (
        <></>
    );
};

export default SuccessPage;
