import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  BookHeart,
  Gem,
  Home,
  LogOut,
  MailCheck,
  MailWarning,
  Send,
  SquareUser,
  UserCheck,
  UserCog,
} from "lucide-react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

const sharedItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Biodatas",
    to: "/biodatas",
    icon: SquareUser,
  },
  {
    title: "Contact Us",
    to: "/contact",
    icon: Send,
  },
  {
    title:"My Profile",
    to:"/dashboard/my-profile",
    icon: UserCog
  }
];

const adminItems = [
  {
    title: "Admin Home",
    to: "/dashboard/admin-home",
    icon: Home,
  },
  {
    title: "Manage Users",
    to: "/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Approve Premium",
    to: "/dashboard/approve-premium",
    icon: UserCheck,
  },
  {
    title: "Approve Contact Requests",
    to: "/dashboard/approve-contact-requests",
    icon: MailCheck,
  },
  {
    title: "Success Stories",
    to: "/dashboard/admin/success-stories",
    icon: MailCheck,
  }
];

const userItems = [
  {
    title: "User Home",
    to: "/dashboard/user-home",
    icon: Home,
  },
  {
    title: "Manage Biodata",
    to: "/dashboard/manage-biodata",
    icon: UserCog,
  },
  {
    title: "My Contact Requests",
    to: "/dashboard/my-contact-requests",
    icon: MailWarning,
  },
  {
    title: "My Favourites",
    to: "/dashboard/my-favourites",
    icon: BookHeart,
  },
  {
    title: "Got Married",
    to: "/dashboard/got-married",
    icon: Gem,
  },
];

const AppSidebar = () => {
  const { logoutUser } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const isAdminRole = isAdmin;
  const varriable = isAdminRole ? adminItems : userItems;
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the logout function

        logoutUser().then(() => {
          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been logged out successfully.',
            icon: 'success',
          });
          navigate('/')
        })
      }
    });


  }


  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {varriable.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        className={
                          location.pathname === item.to
                            ? "flex items-center space-x-2 p-2 bg-indigo-500 text-white rounded-md"
                            : "flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sharedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        className={location.pathname === item.to
                          ? "flex items-center space-x-2 p-2 bg-indigo-500 text-white rounded-md"
                          : "flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <Link onClick={() => handleLogout()} className="bg-me-orange px-4 py-2 rounded-lg flex items-center gap-2 text-white"><LogOut size={20} />Logout</Link>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;


