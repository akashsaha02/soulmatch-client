import { cn } from "@/lib/utils";

const PageHeader = ({ eyebrow, title, lead, className, children }) => (
    <header className={cn("bg-rose-glow", className)}>
        <div className="container-page pb-10 pt-12 md:pb-14 md:pt-16">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-light leading-tight md:text-6xl">{title}</h1>
            {lead && <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{lead}</p>}
            {children}
        </div>
    </header>
);

export default PageHeader;
