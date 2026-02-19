import React from 'react';
import LoginForm from './LoginForm';

//import module
import { Helmet } from 'react-helmet-async';
function LogintPage({ siteUrl }) {
    return (
        <>
            <Helmet>
                <title>Login Page - Book my event</title>
                <meta name="description" content="This is the contactpage of Bookmyevent." />
            </Helmet>
            <LoginForm siteUrl={siteUrl} />
        </>
    );
}

export default LogintPage;
