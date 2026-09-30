import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

const Loader = ({ fullScreen = true, label = "Loading", className }) => {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "flex flex-col items-center justify-center gap-4",
                fullScreen ? "min-h-screen" : "py-24",
                className
            )}
        >
            <LogoMark className="h-10 w-14 animate-pulse" />
            <div className="h-1 w-28 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,transparent,hsl(var(--primary)),transparent)] bg-[length:200%_100%]" />
            </div>
            <span className="sr-only">{label}…</span>
        </div>
    );
};

export default Loader;
