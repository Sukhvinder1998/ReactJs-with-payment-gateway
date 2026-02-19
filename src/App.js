import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


// CSS VEndors
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/stylesheet.css';
import './assets/css/theme-style.css';

// Import All Pages
import Header from './inc/components/Header';
import Home from './inc/pages/HomePage';
import Events from './inc/pages/EventPage';
import EventDetail from './inc/singlePage/EventDetail';
import Blogs from './inc/pages/BlogPage';
import BlogDetail from './inc/singlePage/BlogDetail';
import Contact from './inc/pages/ContactPage';
import Products from './inc/pages/Products';
// import NotFound from './inc/pages/NotFound';
import PaymentCheck from './inc/pages/paymentcheck';
import Footer from './inc/components/Footer';

import ScrollToTop from "./inc/components/ScrollToTop";


// User Dashboard
import Login from './inc/auth/Login';
import Register from './inc/auth/Register';
import ProtectedRoute from './inc/auth/ProtectedRoute';
import ChangePassword from './inc/user-dashboard/ChangePassword';
import Orders from './inc/user-dashboard/Order';
import Profile from './inc/user-dashboard/Profile';


//Stripe
import StripePayment from "./inc/stripe/StripePayment";
import PaymentSuccess from "./inc/stripe/PaymentSuccess";
import Thankyou from "./inc/pages/Thankyou";

function App() {
  // const siteUrl = "https://bookmyevents.tmdemo.in/bme-admin/";
  const siteUrl = "http://originalboommyevents.wp/";
  const [eventDetails, setEventDetails] = useState({ eventname: '', eventid: '' });

  const location = useLocation();
  useEffect(() => {
    // Access query parameters from URL
    const params = new URLSearchParams(location.search);
    const eventname = params.get('eventname');
    const eventid = params.get('eventid');

    // Set the event details in state
    if (eventname && eventid) {
      setEventDetails({ eventname, eventid });
    }
  }, [location]);

  
  return (
    <>
    
      {/* <Router> */}
        <ScrollToTop />
        <Header siteUrl={siteUrl} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home pageName="Home" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/events" element={<Events pageName="Events" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/event/:slug" element={<EventDetail pageName="Event Details" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/blog" element={<Blogs pageName="Blog" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/blog/:slug" element={<BlogDetail pageName="Blog Details" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/contact" element={<Contact pageName="Contact" siteUrl={siteUrl} flexibleContentId={"sections"} />} />
            {/* <Route path="/shop" element={<Products siteUrl={siteUrl} />} /> */}
            <Route path="/login" element={<Login siteUrl={siteUrl} />} />
            <Route path="/register" element={<Register siteUrl={siteUrl} />} />
            {/* following route is used for protected components means if some page/component open only after login */}
            <Route
            path="/profile"
              element={
                <ProtectedRoute>
                  <Profile siteUrl={siteUrl} />
                </ProtectedRoute>
              }
            />
          {/* <Route path="/change-password" element={
            <ProtectedRoute>
            <ChangePassword siteUrl={siteUrl} />
            </ProtectedRoute>
            } /> */}
          <Route path="/orders" element={
            <ProtectedRoute>
            <Orders siteUrl={siteUrl} />
            </ProtectedRoute>
            } />

          <Route path="/shop" element={
            <ProtectedRoute>
              <Products siteUrl={siteUrl} />
            </ProtectedRoute>
          } />

          <Route
            path="/book/event/:slug"
            element={
              <ProtectedRoute>
                <StripePayment eventDetails={eventDetails} siteUrl={siteUrl} />
              </ProtectedRoute>
            }
          />
          <Route path="success" element={<PaymentSuccess siteUrl={siteUrl} />} />
          <Route path="thankyou" element={
            <ProtectedRoute>
            <Thankyou/>
            </ProtectedRoute>
            } />
          <Route path="/paymentcheck" element={<PaymentCheck />} />
          </Routes>
        </div>
        <Footer siteUrl={siteUrl} />
      {/* </Router> */}
    </>
  );
}

export default App;
