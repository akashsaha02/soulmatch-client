import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const LogoMark = ({ className }) => (
    <svg viewBox="0 0 40 28" aria-hidden="true" className={cn("h-7 w-10", className)}>
        <circle cx="14" cy="14" r="10.5" fill="none" stroke="hsl(343 65% 48%)" strokeWidth="3.5" />
        <circle cx="26" cy="14" r="10.5" fill="none" stroke="#d9a656" strokeWidth="3.5" />
        {/* redraw the top-left arc of the rose ring so the rings interlock */}
        <path d="M 14 3.5 A 10.5 10.5 0 0 1 24.1 11.2" fill="none" stroke="hsl(343 65% 48%)" strokeWidth="3.5" />
    </svg>
);

const Logo = ({ className, light = false, to = "/" }) => (
    <Link to={to} className={cn("flex items-center gap-2", className)} aria-label="SoulMatch home">
        <LogoMark />
        <span className={cn("font-display text-2xl font-semibold tracking-tight", light ? "text-white" : "text-foreground")}>
            Soul<span className="italic text-primary">Match</span>
        </span>
    </Link>
);

export default Logo;
