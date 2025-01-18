import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
// import useCart from './../../hooks/useCart';
import useAxiosSecure from '@/hooks/useAxiosSecure';

// Load Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const axiosSecure = useAxiosSecure();
//   const [cart] = useCart();
//   const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const totalPrice = 5;

  useEffect(() => {
    if (totalPrice > 0) {
      const roundedPrice = Math.round(totalPrice * 100); // Convert to cents and round to nearest integer
      axiosSecure.post("/create-payment-intent", { price: roundedPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => console.error("Failed to fetch payment intent"));
    }
  }, [axiosSecure, totalPrice]);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <div>
      {/* <SectionTitle heading="Payment" subHeading="Please pay to eat" /> */}
      <div className="max-w-3xl mx-auto">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default Payment;