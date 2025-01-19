import AppSidebar from "@/components/app-sidebar"
import Loader from "@/components/shared/Loader"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    }
    // console.log(user);
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <div className="flex justify-between items-center bg-gray-500 text-white w-full px-4 py-2">
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
