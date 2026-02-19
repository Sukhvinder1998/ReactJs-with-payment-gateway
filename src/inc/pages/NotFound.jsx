import React, { useState } from 'react'; // For React and useState
import axios from 'axios'; // For making API requests
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'; // Stripe components

function NotFound() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Jvb2tteWV2ZW50cy50bWRlbW8uaW4vYm1lLWFkbWluIiwiaWF0IjoxNzM2NzU2NTMyLCJuYmYiOjE3MzY3NTY1MzIsImV4cCI6MTczNzM2MTMzMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.0FrqIK81u3_YIQ6Z9ZadBcnoChJqbuhLeo5r2RMz4RQ'; // Replace with your actual token

  // Step 1: Create the WooCommerce order
  const createOrder = async (orderData) => {
    try {
      const response = await axios.post('https://bookmyevents.tmdemo.in/bme-admin/wp-json/wc/v3/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      throw new Error('Error creating order');
    }
  };

  // Step 2: Create the Stripe Payment Intent
  const createPaymentIntent = async (orderId, amount) => {
    try {
      const params = new URLSearchParams();
      params.append('amount', amount.toString());
      params.append('currency', 'usd');
      params.append('payment_method_types[]', 'card');
      params.append('metadata[order_id]', orderId);
      params.append('description', 'Payment for order #' + orderId);

      params.append('shipping[name]', 'Sukhi');  // Add the customer name
      params.append('shipping[address][line1]', 'test');  // Address line 1
      params.append('shipping[address][city]', 'city');  // City
      params.append('shipping[address][country]', 'India');  // Country
      params.append('shipping[address][postal_code]', '134203');  

      const response = await axios.post('https://api.stripe.com/v1/payment_intents', params, {
        headers: {
          Authorization: `Bearer sk_test_51QWcqiSHszh1D4vFLQE0bThUZ9OAiOsR5RmICKY7ug63tYnsYxbJR6dGtWQGS7IeqyxYqSFD4fr2eyr6krrZXCSI00x2uNnQ3Y`, // Replace with your Stripe secret key
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.client_secret;
    } catch (err) {
      console.error('Error creating payment intent:', err);
      throw new Error('Error creating payment intent');
    }
  };

  // Step 3: Handle the payment process
  const handlePayment = async (orderId, amount) => {
    if (!stripe || !elements) {
      throw new Error('Stripe has not loaded yet');
    }

    setLoading(true);
    setError(null);

    try {
      const clientSecret = await createPaymentIntent(orderId, amount);

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card details are not entered');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'John Doe', // Replace with actual customer name
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', paymentIntent);
        await updateOrderStatus(orderId, 'completed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(err.message || 'Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Update the WooCommerce order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        `https://bookmyevents.tmdemo.in/bme-admin/wp-json/wc/v3/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Order updated:', response.data);
    } catch (err) {
      console.error('Error updating order status:', err);
      throw new Error('Error updating order status');
    }
  };

  // Step 5: Submit the order and start payment
  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const orderData = {
      payment_method: 'stripe',
      payment_method_title: 'Credit Card (Stripe)',
      set_paid: false,
      line_items: [
        {
          product_id: 559, // Replace with actual product ID
          quantity: 1,
        },
      ],
      billing: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@test.com',
        phone: '1234567890',
      },
      shipping: {
        first_name: 'John',
        last_name: 'Doe',
      },
    };

    try {
      const order = await createOrder(orderData);
      const orderId = order.id;
      const orderAmount = 1000; // Amount in cents ($10.00)

      console.log('Order created with ID:', orderId);
      await handlePayment(orderId, orderAmount);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Order creation or payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={onSubmitForm}>
        <CardElement
          onChange={(event) => {
            if (event.complete) {
              console.log('Card details complete');
            } else if (event.error) {
              console.error(event.error.message);
            }
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Order and Pay'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default NotFound;
