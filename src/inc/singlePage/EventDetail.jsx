import React from 'react';
// import sections
import EventContent from '../components/sections/EventPage/SinglePage/EventContent';
//import module
import { Helmet } from 'react-helmet-async';
function EventDetail({ siteUrl }) {
    return (
        <>
            <Helmet>
                <title>Event Detail Page - Book my event</title>
                <meta name="description" content="This is the event detail page of Bookmyevent." />
            </Helmet>
          {/* EventContent Section   */}
            <EventContent siteUrl={siteUrl} />
        </>
    );
}

export default EventDetail;
