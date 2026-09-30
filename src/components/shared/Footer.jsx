import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/biodatas", label: "Browse profiles" },
      { to: "/register", label: "Create an account" },
      { to: "/dashboard/user-home", label: "Go premium" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/contact", label: "Contact" },
      { to: "/#faq", label: "FAQ" },
    ],
  },
];

const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
];

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Thanks for subscribing! Stories are on their way.");
  };

  return (
    <footer className="bg-plum-950 text-plum-200">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr] lg:py-20">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-plum-300">
            Connecting hearts and creating stories. SoulMatch brings you closer to your soulmate with trust, privacy and care.
          </p>
          <div className="flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-plum-200 transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">{col.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Love letters</h3>
          <p className="mt-5 text-sm text-plum-300">Real stories and dating tips, once a month. No spam.</p>
          <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 focus-within:border-primary/60">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-plum-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-primary/90"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-plum-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SoulMatch. All rights reserved.</p>
          <p>Made with care for lasting love.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
