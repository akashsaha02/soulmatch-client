import { Helmet } from "react-helmet";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

// Shared building blocks for dashboard pages.

export const DashboardPage = ({ title, description, actions, children, className }) => (
    <div className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10", className)}>
        <Helmet>
            <title>{title} | SoulMatch Dashboard</title>
        </Helmet>
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <h1 className="text-3xl font-light md:text-4xl">{title}</h1>
                {description && <p className="mt-2 text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
        </div>
        {children}
    </div>
);

export const StatCard = ({ icon: Icon, label, value, tone = "rose", delay = 0 }) => {
    const tones = {
        rose: "bg-secondary text-primary",
        plum: "bg-plum-100 text-plum-700",
        gold: "bg-gold-100 text-gold-600",
        sage: "bg-emerald-50 text-emerald-700",
        sky: "bg-sky-50 text-sky-700",
    };
    return (
        <Reveal delay={delay} className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">
            <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", tones[tone])}>
                <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{label}</p>
                <p className="font-display text-2xl font-medium tabular-nums">{value}</p>
            </div>
        </Reveal>
    );
};

export const Panel = ({ title, description, actions, children, className, bodyClassName }) => (
    <section className={cn("overflow-hidden rounded-3xl bg-card shadow-soft", className)}>
        {(title || actions) && (
            <div className="flex flex-col justify-between gap-3 border-b px-6 py-5 sm:flex-row sm:items-center">
                <div>
                    {title && <h2 className="text-lg font-medium">{title}</h2>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                {actions}
            </div>
        )}
        <div className={bodyClassName}>{children}</div>
    </section>
);

export const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => (
    <div className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary">
            <Icon className="h-6 w-6 text-primary" />
        </span>
        <h3 className="mt-4 text-xl font-medium">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
        {action && <div className="mt-5">{action}</div>}
    </div>
);
