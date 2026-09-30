import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import useAdmin from "@/hooks/useAdmin";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const links = [
    { to: "/", label: "Home" },
    { to: "/biodatas", label: "Browse" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

const Navbar = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Only the home page has a full-bleed hero behind the navbar.
    const overHero = pathname === "/" && !scrolled;
    const dashboardPath = isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home";

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                overHero ? "bg-transparent" : "glass border-x-0 border-t-0 border-b-border/60 shadow-soft"
            )}
        >
            <nav className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
                <Logo light={overHero} />

                <ul className="hidden items-center gap-1 lg:flex">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                end={link.to === "/"}
                                className={({ isActive }) =>
                                    cn(
                                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                        "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                                        overHero ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-foreground",
                                        isActive && "after:scale-x-100",
                                        isActive && (overHero ? "text-white" : "text-foreground")
                                    )
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Button asChild variant={overHero ? "glass" : "soft"} size="sm" className="hidden lg:inline-flex">
                                <Link to={dashboardPath}>Dashboard</Link>
                            </Button>
                            <UserMenu />
                        </>
                    ) : (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Button asChild variant="ghost" size="sm" className={cn(overHero && "text-white hover:bg-white/10 hover:text-white")}>
                                <Link to="/login">Sign in</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link to="/register">Join free</Link>
                            </Button>
                        </div>
                    )}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open menu"
                                className={cn("lg:hidden", overHero && "text-white hover:bg-white/10 hover:text-white")}
                            >
                                <Menu className="!size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex w-[85%] flex-col gap-8 rounded-l-3xl sm:max-w-sm">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <Logo />
                            <ul className="flex flex-col gap-1">
                                {[...links, ...(user ? [{ to: dashboardPath, label: "Dashboard" }] : [])].map((link) => (
                                    <li key={link.to}>
                                        <SheetClose asChild>
                                            <NavLink
                                                to={link.to}
                                                end={link.to === "/"}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "block rounded-xl px-4 py-3 font-display text-2xl transition-colors",
                                                        isActive ? "bg-secondary text-primary" : "hover:bg-muted"
                                                    )
                                                }
                                            >
                                                {link.label}
                                            </NavLink>
                                        </SheetClose>
                                    </li>
                                ))}
                            </ul>
                            {!user && (
                                <div className="mt-auto grid gap-2">
                                    <SheetClose asChild>
                                        <Button asChild size="lg"><Link to="/register">Join free</Link></Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button asChild variant="outline" size="lg"><Link to="/login">Sign in</Link></Button>
                                    </SheetClose>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
