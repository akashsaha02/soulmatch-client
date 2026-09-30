import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  BookHeart,
  ChartPie,
  Gem,
  Globe,
  Heart,
  LayoutDashboard,
  LogOut,
  MailCheck,
  MailQuestion,
  Send,
  UserCheck,
  UserRound,
  UserRoundPen,
  Users,
} from "lucide-react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import Logo from "./shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { initials } from "@/lib/utils";

const adminItems = [
  { title: "Overview", to: "/dashboard/admin-home", icon: ChartPie },
  { title: "Manage users", to: "/dashboard/users", icon: Users },
  { title: "Approve premium", to: "/dashboard/approve-premium", icon: UserCheck },
  { title: "Contact requests", to: "/dashboard/approve-contact-requests", icon: MailCheck },
  { title: "Success stories", to: "/dashboard/admin/success-stories", icon: Heart },
];

const userItems = [
  { title: "Overview", to: "/dashboard/user-home", icon: LayoutDashboard },
  { title: "Edit biodata", to: "/dashboard/manage-biodata", icon: UserRoundPen },
  { title: "Contact requests", to: "/dashboard/my-contact-requests", icon: MailQuestion },
  { title: "Favourites", to: "/dashboard/my-favourites", icon: BookHeart },
  { title: "Got married", to: "/dashboard/got-married", icon: Gem },
];

const sharedItems = [
  { title: "My profile", to: "/dashboard/my-profile", icon: UserRound },
  { title: "Browse profiles", to: "/biodatas", icon: Globe },
  { title: "Contact us", to: "/contact", icon: Send },
];

const NavGroup = ({ label, items }) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/50">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.to}
                tooltip={item.title}
                className="h-10 rounded-xl data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground"
              >
                <NavLink to={item.to} end onClick={() => isMobile && setOpenMobile(false)}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const AppSidebar = () => {
  const { user, logoutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("You've been signed out");
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <Logo light />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label={isAdmin ? "Admin" : "My account"} items={isAdmin ? adminItems : userItems} />
        <NavGroup label="General" items={sharedItems} />
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.photoURL} alt="" />
            <AvatarFallback className="bg-sidebar-primary text-xs text-white">{initials(user?.displayName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{user?.displayName}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out"
            className="grid h-8 w-8 place-items-center rounded-full text-sidebar-foreground/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
