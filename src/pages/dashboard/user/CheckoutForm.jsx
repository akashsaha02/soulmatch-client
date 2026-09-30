import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Button } from '@/components/ui/button';

const CheckoutForm = ({ id, amount = 5 }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not properly initialized.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: user?.displayName || "Guest User",
                            email: user?.email || "guest@example.com",
                        },
                    },
                },
                redirect: "if_required",
            });

            if (error) {
                setErrorMessage(error.message);
            } else if (paymentIntent?.status === "succeeded") {
                const contactRequest = {
                    email: user.email,
                    biodataId: id,
                    transactionId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    date: new Date().toISOString(),
                    status: 'pending',
                };

                const res = await axiosSecure.post("/payments", contactRequest);

                if (res.data.result.insertedId) {
                    toast.success("Payment successful", {
                        description: `Transaction ${paymentIntent.id}. We'll notify you once it's approved.`,
                    });
                    navigate('/dashboard/my-contact-requests');
                } else {
                    setErrorMessage("Payment not completed. Please try again.");
                }
            } else {
                setErrorMessage("Payment not completed. Please try again.");
            }
        } catch {
            setErrorMessage("An error occurred while processing your payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {errorMessage && (
                <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{errorMessage}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={!stripe || !elements || loading}>
                {loading && <Loader2 className="animate-spin" />}
                {loading ? "Processing…" : `Pay $${amount.toFixed(2)}`}
            </Button>
        </form>
    );
};

export default CheckoutForm;
