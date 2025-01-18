// import { useParams } from 'react-router-dom';
// import SectionTitleHome from './../../components/shared/SectionTitleHome';
// import CheckoutForm from '../dashboard/user/CheckoutForm';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { useEffect, useState } from 'react';
// import useAxiosSecure from '@/hooks/useAxiosSecure';


// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

// const Checkout = () => {
//     const [clientSecret, setClientSecret] = useState(null);
//     const axiosSecure = useAxiosSecure();
//     const { id } = useParams();
//     const totalPrice = 5;
//     useEffect(() => {
//         if (totalPrice > 0) {
//             const roundedPrice = Math.round(totalPrice * 100); // Convert to cents and round to nearest integer
//             axiosSecure.post("/create-payment-intent", { price: roundedPrice })
//                 .then((res) => setClientSecret(res.data.clientSecret))
//                 .catch(() => console.error("Failed to fetch payment intent"));
//         }
//     }, [axiosSecure, totalPrice]);

//     const appearance = { theme: 'stripe' };
//     const options = { clientSecret, appearance };

//     return (
//         <div>
//             <SectionTitleHome heading="Checkout" subHeading="Please pay to view contact Information" />

//             {clientSecret ? (
//                 <Elements stripe={stripePromise} options={options}>
//                     <CheckoutForm  />
//                 </Elements>
//             ) : (
//                 <p>Loading payment details...</p>
//             )}
//         </div>
//     )
// }

// export default Checkout


import { useParams } from 'react-router-dom';
import SectionTitleHome from './../../components/shared/SectionTitleHome';
import CheckoutForm from '../dashboard/user/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Checkout = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState(null);
    const totalPrice = 5;

    useEffect(() => {
        if (totalPrice > 0) {
            const roundedPrice = Math.round(totalPrice * 100); // Convert to cents
            axiosSecure.post("/create-payment-intent", { price: roundedPrice })
                .then((res) => setClientSecret(res.data.clientSecret))
                .catch(() => console.error("Failed to fetch payment intent"));
        }
    }, [axiosSecure, totalPrice]);

    const appearance = { theme: 'stripe' };
    const options = { clientSecret, appearance };

    return (
        <div>
            <SectionTitleHome heading="Checkout" subHeading="Please pay to view contact information" />
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
                <form className="space-y-4">
                    {/* Biodata ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Biodata ID</label>
                        <input
                            type="text"
                            value={id}
                            readOnly
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div>

                    {/* Self Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div>
                </form>
                {clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm id={id} />
                    </Elements>
                ) : (
                    <p>Loading payment details...</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
