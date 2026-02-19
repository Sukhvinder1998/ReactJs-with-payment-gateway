// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NotFound from './NotFound';

// Load Stripe.js with your publishable key
const stripePromise = loadStripe('pk_test_51QWcqiSHszh1D4vFlvAfVme4sCHQSuPzo6R6oZbTNgkQi7EsL7JFsINnaTt6RhvkY8jBOELcaT03Rq6Jtoqg04Wa00rwnB82lz');

function App() {
    return (
        <Elements stripe={stripePromise}>
            <NotFound />
        </Elements>
    );
}

export default App;
