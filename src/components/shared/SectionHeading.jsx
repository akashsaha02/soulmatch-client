import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const SectionHeading = ({ eyebrow, title, lead, align = "center", className, children }) => {
    return (
        <Reveal
            className={cn(
                "mb-12 flex flex-col gap-3 md:mb-16",
                align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
                className
            )}
        >
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-5xl">{title}</h2>
            {lead && <p className="text-balance text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>}
            {children}
        </Reveal>
    );
};

export default SectionHeading;
