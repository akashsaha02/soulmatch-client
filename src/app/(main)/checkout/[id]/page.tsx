"use client";

import { useParams } from "next/navigation";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import CheckoutForm from "@/features/payments/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/shared/lib/axios";
import { useAuth } from "@/features/auth/hooks/useAuth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function CheckoutPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const totalPrice = 5;

  useEffect(() => {
    if (totalPrice > 0) {
      const roundedPrice = Math.round(totalPrice * 100);
      axiosSecure
        .post("/create-payment-intent", { price: roundedPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => console.error("Failed to fetch payment intent"));
    }
  }, [totalPrice]);

  const appearance = { theme: "stripe" as const };
  const options = { clientSecret: clientSecret ?? "", appearance };

  return (
    <div>
      <SectionTitleHome heading="Checkout" subHeading="Please pay to view contact information" />
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <form className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Biodata ID</label>
            <input
              type="text"
              value={id}
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Payment Amount</label>
            <input
              type="text"
              value="5.00 $"
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
        </form>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm id={id ?? ""} />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  );
}
