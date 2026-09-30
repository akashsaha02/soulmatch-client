import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = forwardRef(({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <Input ref={ref} type={visible ? "text" : "password"} className={cn("pr-12", className)} {...props} />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
});
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
