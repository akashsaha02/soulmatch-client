import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const CheckoutForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const [errorMessage, setErrorMessage] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not properly initialized.");
            return;
        }

        setLoading(true);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: user?.name || "Guest User",
                            email: user?.email || "guest@example.com",
                        },
                    },
                },
                redirect: "if_required",
            });

            if (error) {
                setErrorMessage(error.message);
            } else if (paymentIntent?.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const paymentInfo = {
                    email: user?.email,
                    amount: paymentIntent.amount,
                    transactionId: paymentIntent.id,
                    date: new Date().toISOString(),
                    status: 'pending'
                };

                const res = await axiosSecure.post("/payments", paymentInfo);
                console.log(res.data);

                if (res.data.result.insertedId) {
                    console.log("Payment completed successfully");

                    Swal.fire({
                        title: "Payment Successful",
                        text: "Your payment has been successfully processed.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                    });
                    navigate("/dashboard/payment-history");
                } else {
                    setErrorMessage("Payment not completed. Please try again.");
                }
            } else {
                setErrorMessage("Payment not completed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while processing your payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={!stripe || !elements || loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {transactionId && <div className="text-green-500 mt-2">Transaction ID: {transactionId}</div>}
        </form>
    );
};

export default CheckoutForm;
