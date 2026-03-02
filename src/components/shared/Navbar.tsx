"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Swal from "sweetalert2";
import { useGetAdminStatusQuery } from "@/features/admin/api/usersApi";
import logo from "@/assets/icons/logo.png";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const { data: isAdmin } = useGetAdminStatusQuery(user?.email ?? undefined, {
    skip: !user?.email,
  });

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

  const navLink = (to: string, label: string) => {
    const isActive = pathname === to;
    return (
      <Link
        href={to}
        className={isActive ? "text-me-orange font-medium" : "text-gray-700"}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="sticky top-0 z-50 shadow-md bg-white">
      <Card className="py-3 px-4 max-w-7xl mx-auto border-0 flex items-center justify-between gap-6 rounded-none">
        <div className="text-xl md:text-2xl 2xl:text-3xl text-me-darkOrange font-bold flex items-center gap-2 cinzel">
          <img src={logo.src} className="h-6" alt="SoulMatch" />
          <p className="hidden sm:block">
            Soul<span className="text-me-brown">Match</span>
          </p>
        </div>

        <ul className="hidden lg:flex items-center gap-10 text-card-foreground">
          <li>{navLink("/", "Home")}</li>
          <li>{navLink("/biodatas", "Biodatas")}</li>
          <li>{navLink("/about", "About Us")}</li>
          <li>{navLink("/contact", "Contact Us")}</li>
          {user && (
            <li>
              {navLink(
                isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home",
                "Dashboard"
              )}
            </li>
          )}
          {user && (
            <li>
              <Button variant="outline" size="sm" onClick={() => handleLogOut()}>
                Logout
              </Button>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <Link
              href="/dashboard/my-profile"
              className="flex items-center gap-2"
            >
              <span className="hidden lg:block text-sm">{user?.displayName}</span>
              <img
                src={user?.photoURL ?? ""}
                alt={user?.email ?? ""}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full block"
              />
            </Link>
          ) : (
            <>
              <Button asChild variant="secondary" className="w-full text-sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full text-sm">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          <div className="flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/" className={pathname === "/" ? "text-me-orange font-medium" : "text-gray-700"}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/biodatas" className={pathname === "/biodatas" ? "text-me-orange font-medium" : "text-gray-700"}>Biodatas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className={pathname === "/about" ? "text-me-orange font-medium" : "text-gray-700"}>About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className={pathname === "/contact" ? "text-me-orange font-medium" : "text-gray-700"}>Contact Us</Link>
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem asChild>
                    <Link href={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} className={pathname?.startsWith("/dashboard") ? "text-me-orange font-medium" : "text-gray-700"}>Dashboard</Link>
                  </DropdownMenuItem>
                )}
                {user && (
                  <DropdownMenuItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLogOut()}
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </div>
  );
}
