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
import logo from '../../assets/icons/logo.svg'

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
                {/* logo & site name */}
                <div className="cinzel font-semibold text-2xl text-me-pink flex items-center">
                    {/* <img src={logo} className="w-10 h-10 rounded-full" alt="" /> */}
                    SoulMatch
                </div>

                <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-me-orange font-medium" : "text-gray-700"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/biodatas"
                            className={({ isActive }) =>
                                isActive ? "text-me-orange font-medium" : "text-gray-700"
                            }
                        >
                            Biodatas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "text-me-orange font-medium" : "text-gray-700"
                            }
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? "text-me-orange font-medium" : "text-gray-700"
                            }
                        >
                            Contact Us
                        </NavLink>
                    </li>

                    {user && (
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "text-me-orange font-medium" : "text-gray-700"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className="flex items-center gap-2">
                    {user ? (
                        <Button variant="outline" size="sm" onClick={() => handleLogOut()}>
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
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive ? "text-me-orange font-medium" : "text-gray-700"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink
                                        to="/biodatas"
                                        className={({ isActive }) =>
                                            isActive ? "text-me-orange font-medium" : "text-gray-700"
                                        }
                                    >
                                        Biodatas
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            isActive ? "text-me-orange font-medium" : "text-gray-700"
                                        }
                                    >
                                        About Us
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink
                                        to="/contact"
                                        className={({ isActive }) =>
                                            isActive ? "text-me-orange font-medium" : "text-gray-700"
                                        }
                                    >
                                        Contact Us
                                    </NavLink>
                                </DropdownMenuItem>
                                {user && (
                                    <DropdownMenuItem>
                                        <NavLink
                                            to="/dashboard"
                                            className={({ isActive }) =>
                                                isActive ? "text-me-orange font-medium" : "text-gray-700"
                                            }
                                        >
                                            Dashboard
                                        </NavLink>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Navbar;
