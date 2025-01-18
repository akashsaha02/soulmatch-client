import { useParams } from 'react-router-dom';
import SectionTitleHome from './../../components/shared/SectionTitleHome';
import CheckoutForm from '../dashboard/user/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
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
            <SectionTitleHome heading="Checkout" subHeading="Please pay to view contact Information" />

            {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    )
}

export default Checkout
