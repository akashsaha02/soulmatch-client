import AppSidebar from "@/components/app-sidebar"
import Loader from "@/components/shared/Loader"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    }
    // console.log(user);
    return (
        <SidebarProvider>
            <Helmet>
                <title>Dashboard | SoulMatch</title>
            </Helmet>
            <AppSidebar />
            <div className="w-full">
                <div className="flex justify-between items-center bg-me-darkOrange text-white w-full px-4 py-2 sticky top-0">
                    <div className="">
                        <SidebarTrigger />
                    </div>
                    <p className="">Welcome back, {user.displayName.split(' ')[0]}</p>
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Dashboard
