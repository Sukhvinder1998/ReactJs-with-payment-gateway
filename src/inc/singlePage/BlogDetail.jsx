import React from 'react';
// import sections
import BlogContent from '../components/sections/BlogPage/SinglePage/BlogContent';
//import module
import { Helmet } from 'react-helmet-async';
function BlogDetail({siteUrl}) {
  return (
    <>
      <Helmet>
        <title>Blog Detail Page - Book my event</title>
        <meta name="description" content="This is the blog detail page of Bookmyevent." />
      </Helmet>
      {/* BlogContent Section */}
      <BlogContent siteUrl={siteUrl} />
    </>
  );
}

export default BlogDetail;
