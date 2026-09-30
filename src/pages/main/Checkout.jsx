import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import CheckoutForm from '../dashboard/user/CheckoutForm';
import PageHeader from '@/components/shared/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const PRICE = 5;

const Checkout = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: Math.round(PRICE * 100) })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch(() => setError("We couldn't start the payment. Please refresh and try again."));
    }, [axiosSecure]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#c42a5a',
                borderRadius: '12px',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            },
        },
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap' }],
    };

    const summary = [
        { label: 'Biodata ID', value: `#${id}` },
        { label: 'Your email', value: user?.email },
        { label: 'Access', value: 'Mobile & email' },
    ];

    return (
        <div className="pb-24">
            <Helmet>
                <title>Checkout | SoulMatch</title>
            </Helmet>
            <PageHeader eyebrow="Checkout" title="Request contact information" lead="Once an admin approves your request, the contact details appear in your dashboard." />

            <div className="container-page grid gap-8 lg:grid-cols-[1fr_380px]">
                <section className="rounded-3xl bg-card p-6 shadow-soft md:p-8" aria-label="Payment">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-medium"><LockKeyhole className="h-5 w-5 text-primary" /> Payment details</h2>
                    {error ? (
                        <p className="rounded-xl bg-destructive/5 p-4 text-sm text-destructive">{error}</p>
                    ) : clientSecret ? (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm id={id} amount={PRICE} />
                        </Elements>
                    ) : (
                        <div className="space-y-4">
                            <Skeleton className="h-11 w-full rounded-xl" />
                            <div className="grid grid-cols-2 gap-4"><Skeleton className="h-11 rounded-xl" /><Skeleton className="h-11 rounded-xl" /></div>
                            <Skeleton className="h-12 w-full rounded-full" />
                        </div>
                    )}
                </section>

                <aside className="h-fit rounded-3xl bg-plum-950 p-6 text-white md:p-8 lg:sticky lg:top-28">
                    <h2 className="text-xl font-medium">Order summary</h2>
                    <dl className="mt-6 space-y-4 text-sm">
                        {summary.map((row) => (
                            <div key={row.label} className="flex justify-between gap-4">
                                <dt className="text-plum-300">{row.label}</dt>
                                <dd className="truncate font-medium">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-6">
                        <span className="text-plum-300">Total</span>
                        <span className="font-display text-4xl font-light">${PRICE.toFixed(2)}</span>
                    </div>
                    <p className="mt-6 flex items-start gap-2 text-xs text-plum-300">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-gold-300" />
                        Payments are processed securely by Stripe. We never see your card details.
                    </p>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
