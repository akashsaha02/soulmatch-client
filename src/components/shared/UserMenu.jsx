import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import useAdmin from "@/hooks/useAdmin";
import { initials } from "@/lib/utils";

const UserMenu = ({ align = "end" }) => {
    const { user, logoutUser } = useAuth();
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logoutUser();
            toast.success("You've been signed out");
            navigate("/");
        } catch {
            toast.error("Couldn't sign out. Please try again.");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none ring-offset-2 ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-soft">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName || "Account"} />
                    <AvatarFallback>{initials(user?.displayName)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="w-60 rounded-2xl p-2">
                <DropdownMenuLabel className="font-normal">
                    <p className="truncate font-semibold">{user?.displayName}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg">
                    <Link to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"}>
                        <LayoutDashboard /> Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg">
                    <Link to="/dashboard/my-profile">
                        <UserRound /> My profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut} className="rounded-lg text-destructive focus:text-destructive">
                    <LogOut /> Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
