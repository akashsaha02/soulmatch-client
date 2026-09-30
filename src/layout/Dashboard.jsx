import AppSidebar from "@/components/app-sidebar"
import Loader from "@/components/shared/Loader"
import UserMenu from "@/components/shared/UserMenu"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import useAuth from "@/hooks/useAuth"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0 bg-background">
                <header className="glass sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-x-0 border-t-0 border-b-border/60 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="rounded-full" />
                        <p className="hidden text-sm text-muted-foreground sm:block">
                            Welcome back, <span className="font-semibold text-foreground">{user?.displayName?.split(' ')[0] || 'friend'}</span>
                        </p>
                    </div>
                    {user && <UserMenu />}
                </header>
                <main className="flex-1">
                    <Outlet />
                </main>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    )
}

export default Dashboard
