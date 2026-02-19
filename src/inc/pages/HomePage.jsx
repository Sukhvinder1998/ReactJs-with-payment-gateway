import React from 'react';
import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';

function Home({pageName , flexibleContentId , siteUrl }) {
  return (
    <>
      <Helmet>
        <title>Home Page - Book my event</title>
        <meta name="description" content="This is the homepage of Bookmyevent." />
      </Helmet>
      <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />
    </>
  );
}

export default Home;
