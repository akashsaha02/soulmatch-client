"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { axiosSecure } from "@/shared/lib/axios";

export default function CheckoutForm({ id }: { id: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
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
              name: user?.displayName ?? "Guest User",
              email: user?.email ?? "guest@example.com",
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message ?? "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const contactRequest = {
          email: user?.email,
          biodataId: id,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount,
          date: new Date().toISOString(),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", contactRequest);
        if (res.data?.result?.insertedId) {
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment has been successfully processed.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
          router.push("/dashboard/my-contact-requests");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        className="btn btn-primary bg-me-teal px-4 py-2 text-white font-bold uppercase rounded hover:bg-me-pink w-full mt-4 disabled:opacity-50"
        disabled={!stripe || !elements || loading}
      >
        {loading ? "Processing..." : "Pay Now (5.00 $)"}
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {transactionId && <div className="text-green-500 mt-2">Transaction ID: {transactionId}</div>}
    </form>
  );
}
