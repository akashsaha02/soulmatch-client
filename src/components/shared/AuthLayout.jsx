import { Helmet } from "react-helmet";
import { Quote } from "lucide-react";

const AuthLayout = ({ title, image, eyebrow, heading, subheading, quote, children }) => {
    return (
        <div className="container-page py-10 md:py-16">
            <Helmet>
                <title>{title} | SoulMatch</title>
            </Helmet>
            <div className="grid overflow-hidden rounded-[2rem] bg-card shadow-lift lg:grid-cols-2">
                <div className="relative hidden min-h-[640px] lg:block">
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent" />
                    <figure className="absolute inset-x-0 bottom-0 p-10 text-white">
                        <Quote className="h-8 w-8 text-gold-200" />
                        <blockquote className="mt-3 font-display text-2xl font-light leading-snug">{quote.text}</blockquote>
                        <figcaption className="mt-4 text-sm text-white/70">— {quote.author}</figcaption>
                    </figure>
                </div>

                <div className="flex items-center justify-center px-6 py-12 sm:px-12">
                    <div className="w-full max-w-md">
                        <p className="eyebrow">{eyebrow}</p>
                        <h1 className="mt-3 text-4xl font-light">{heading}</h1>
                        <div className="mt-3 text-sm text-muted-foreground">{subheading}</div>
                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
