"use client";

import AppSidebar from "@/components/app-sidebar";
import Loader from "@/shared/components/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    // @ts-expect-error SidebarProvider forwardRef typing
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <div className="w-full">
        <div className="flex justify-between items-center bg-me-darkOrange text-white w-full px-4 py-2 sticky top-0 z-50">
          <div>
            <SidebarTrigger />
          </div>
          <p>
            Welcome back, {user.displayName?.split(" ")[0] ?? "User"}
          </p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </SidebarProvider>
  );
}
