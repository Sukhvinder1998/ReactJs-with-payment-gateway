import React from 'react';

// import sections
// import Banner from '../components/sections/BlogPage/Banner';
// import BlogListing from '../components/sections/BlogPage/BlogListing';

import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';
function Blogs({ pageName, flexibleContentId, siteUrl }) {
  return (
    <>
      <Helmet>
        <title>Blog Page - Book my event</title>
        <meta name="description" content="This is the blogpage of Bookmyevent." />
      </Helmet>


      <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />

    {/* Banner Section */}
       {/* <Banner/> */}


    {/* BlogListing Section */}
          {/* <BlogListing/> */}
      
    </>
  );
}

export default Blogs;
