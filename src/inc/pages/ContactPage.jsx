import React from 'react';
// import sections
// import Banner from '../components/sections/ContactPage/Banner';
// import ContactForm from '../components/sections/ContactPage/ContactForm';

import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';
function ContactPage({ pageName, flexibleContentId, siteUrl }) {
    return (
        <>
            <Helmet>
                <title>Contact Page - Book my event</title>
                <meta name="description" content="This is the contactpage of Bookmyevent." />
            </Helmet>
            {/* Banner section */}
            {/* <Banner/> */}
            {/* Contact form section */}
            {/* <ContactForm/> */}
            <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />
        </>
    );
}

export default ContactPage;
