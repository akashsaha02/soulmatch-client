import { NavLink } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar"
import { Calendar, Home, Inbox, Search, Send, Settings, SquareUser, } from "lucide-react"



const sharedItems = [
    {
        title: "Home",
        to: "/",
        icon: Home,
    },
    {
        title: "Biodatas",
        to: "#",
        icon: SquareUser,
    },
    {
        title: "Contact Us",
        to: "#",
        icon: Send,
    },
    {
        title: "Settings",
        to: "#",
        icon: Settings,
    },
]


const AppSidebar = () => {
    return (
        <div>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sharedItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <NavLink to={item.to}>
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
    )
}

export default AppSidebar
