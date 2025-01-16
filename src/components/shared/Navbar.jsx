import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";



const Navbar = () => {

    const { user, logoutUser } = useAuth();

    const handleLogOut = async () => {
        try {
            await logoutUser();
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Logged out successfully!",
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="sticky top-0 z-50 shadow-md">
            <Card className=" py-3 px-4 max-w-[1920px] bg-white border-0 flex items-center justify-between gap-6 rounded-none">
                {/* <ShadcnKit className="text-primary cursor-pointer" /> */}

                {/* logo & site name */}
                <div className="playfair">
                    Matrimonealsite
                </div>

                <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                    <li className="text-primary font-medium">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/biodatas">Biodatas</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </li>

                    {user && (
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                    )}

                </ul>

                <div className="flex items-center gap-2">
                    {user ? (
                        <Button variant="outline" size="sm" onClick={() => handleLogOut()} >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button asChild variant="secondary" className="w-full text-sm">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild className="w-full text-sm">
                                <Link to="/register">Register</Link>
                            </Button>
                        </>
                    )}

                    <div className="flex md:hidden items-center gap-2">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-5 w-5 rotate-0 scale-100" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <NavLink to="/">Home</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/biodatas">Biodatas</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/about">About Us</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/contact">Contact Us</NavLink>
                                </DropdownMenuItem>
                                {user && (
                                    <DropdownMenuItem>
                                        <NavLink to="/dashboard">Dashboard</NavLink>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* <ThemeToggle /> */}
                </div>
            </Card >
        </div >
    );
};

export default Navbar;
