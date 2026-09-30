import { cn } from "./utils";

// Tailwind classNames for react-select so it matches the shadcn inputs.
export const selectClassNames = {
    control: ({ isFocused }) =>
        cn(
            "!min-h-11 !rounded-xl !border !bg-white !px-2 !text-sm !shadow-none transition-colors",
            isFocused ? "!border-primary/50 !ring-4 !ring-primary/10" : "!border-input hover:!border-primary/30"
        ),
    placeholder: () => "!text-muted-foreground",
    singleValue: () => "!text-foreground",
    menu: () => "!mt-1 !overflow-hidden !rounded-xl !border !border-border !shadow-lift",
    menuList: () => "!p-1.5",
    option: ({ isFocused, isSelected }) =>
        cn(
            "!cursor-pointer !rounded-lg !px-3 !py-2 !text-sm",
            isSelected ? "!bg-primary !text-primary-foreground" : isFocused ? "!bg-secondary !text-secondary-foreground" : "!bg-transparent"
        ),
    indicatorSeparator: () => "!hidden",
    dropdownIndicator: () => "!text-muted-foreground",
};
