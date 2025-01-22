// import { NavLink } from "react-router-dom"
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "./ui/sidebar"
// import { BookHeart, Gem, Home, MailCheck, MailWarning, Send, SquareUser, UserCheck, UserCog, } from "lucide-react"
// import useAdmin from "@/hooks/useAdmin"

// const sharedItems = [
//     {
//         title: "Home",
//         to: "/",
//         icon: Home,
//     },
//     {
//         title: "Biodatas",
//         to: "/biodatas",
//         icon: SquareUser,
//     },
//     {
//         title: "Contact Us",
//         to: "/contact",
//         icon: Send,
//     },
// ]

// const adminItems = [
//     {
//         title: "Admin Home",
//         to: "/dashboard/admin-home",
//         icon: Home,
//     },
//     {
//         title: "Manage Users",
//         to: "/dashboard/users",
//         icon: UserCog,
//     },
//     {
//         title: "Approve Premium",
//         to: "/dashboard/approve-premium",
//         icon: UserCheck,
//     },
//     {
//         title: "Approve Contact Requests",
//         to: "/dashboard/approve-contact-requests",
//         icon: MailCheck,
//     },

//     // TODO:Logout Button 
// ]

// const userItems = [
//     {
//         title: "User Home",
//         to: "/dashboard/user-home",
//         icon: Home,
//     },
//     {
//         title: "Manage Biodata",
//         to: "/dashboard/manage-biodata",
//         icon: UserCog,
//     },
//     {
//         title:'My Contact Requests',
//         to:'/dashboard/my-contact-requests',
//         icon:MailWarning,

//     },
//     {
//         title:'My Favourites',
//         to:'/dashboard/my-favourites',
//         icon:BookHeart,

//     },
//     {
//         title:'Got Married',
//         to:'/dashboard/got-married',
//         icon:Gem,
//     }
// ]


// const AppSidebar = () => {
//     const [isAdmin, isAdminLoading] = useAdmin();
//     const isAdminRole = isAdmin;
//     const varriable = isAdminRole ? adminItems : userItems;
 
//     return (
//         <div>
//             <Sidebar>
//                 <SidebarContent>
//                     <SidebarGroup>
//                         <SidebarGroupLabel>Admin </SidebarGroupLabel>
//                         <SidebarGroupContent>
//                             <SidebarMenu>
//                                 {varriable.map((item) => (
//                                     <SidebarMenuItem key={item.title}>
//                                         <SidebarMenuButton asChild>
//                                             <NavLink to={item.to}>
//                                                 <item.icon />
//                                                 <span>{item.title}</span>
//                                             </NavLink>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 ))}
//                             </SidebarMenu>
//                         </SidebarGroupContent>
//                     </SidebarGroup>
//                     <SidebarGroup>
//                         <SidebarGroupLabel>Application</SidebarGroupLabel>
//                         <SidebarGroupContent>
//                             <SidebarMenu>
//                                 {sharedItems.map((item) => (
//                                     <SidebarMenuItem key={item.title}>
//                                         <SidebarMenuButton asChild>
//                                             <NavLink to={item.to}>
//                                                 <item.icon />
//                                                 <span>{item.title}</span>
//                                             </NavLink>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 ))}
//                             </SidebarMenu>
//                         </SidebarGroupContent>
//                     </SidebarGroup>
//                 </SidebarContent>
//             </Sidebar>
//         </div>
//     )
// }

// export default AppSidebar


import { NavLink, useLocation } from "react-router-dom";
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
  MailCheck,
  MailWarning,
  Send,
  SquareUser,
  UserCheck,
  UserCog,
} from "lucide-react";
import useAdmin from "@/hooks/useAdmin";

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
  const [isAdmin, isAdminLoading] = useAdmin();
  const isAdminRole = isAdmin;
  const varriable = isAdminRole ? adminItems : userItems;
  const location = useLocation();

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
                        {console.log(location.pathname, item.to)}
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
                        className={ location.pathname === item.to
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
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;


