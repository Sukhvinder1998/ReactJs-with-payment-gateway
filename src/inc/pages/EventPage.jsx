import React from 'react';
import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';
function Events({ pageName, flexibleContentId, siteUrl }) {
  return (
    <>
      <Helmet>
        <title>Event Page - Book my event</title>
        <meta name="description" content="This is the eventpage of Bookmyevent." />
      </Helmet>
      <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />
    </>
  );
}

export default Events;
