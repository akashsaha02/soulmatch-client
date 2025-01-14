import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
//   import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
//   import ShadcnKit from "@/components/icons/shadcn-kit";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 bg-rose-100">
            <Card className=" py-3 px-4 max-w-[1920px] bg-rose-100 border-0 flex items-center justify-between gap-6 rounded-none">
                {/* <ShadcnKit className="text-primary cursor-pointer" /> */}

                {/* logo & site name */}
                <div className="">
                    Matrimonealsite
                </div>

                <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                    <li className="text-primary font-medium">
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#pricing">Pricing</a>
                    </li>
                    <li>
                        <a href="#faqs">FAQs</a>
                    </li>

                </ul>

                <div className="flex items-center gap-2">
                    <Button asChild variant="secondary" className="w-full text-sm">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full text-sm">
                        <Link to="/register">Register</Link>
                    </Button>

                    <div className="flex md:hidden items-center gap-2">
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-5 w-5 rotate-0 scale-100" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <a href="#home">Home</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#features">Features</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#pricing">Pricing</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#faqs">FAQs</a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* <ThemeToggle /> */}
                </div>
            </Card>
        </div>
    );
};

const landings = [
    {
        id: nanoid(),
        title: "Landing 01",
        route: "/project-management",
    },
    {
        id: nanoid(),
        title: "Landing 02",
        route: "/crm-landing",
    },
    {
        id: nanoid(),
        title: "Landing 03",
        route: "/ai-content-landing",
    },
    {
        id: nanoid(),
        title: "Landing 04",
        route: "/new-intro-landing",
    },

];

export default Navbar;
