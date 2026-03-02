"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetAdminStatusQuery } from "@/features/admin/api/usersApi";
import Loader from "./Loader";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { data: isAdmin, isPending: isAdminLoading } = useGetAdminStatusQuery(
    user?.email ?? undefined,
    { skip: !user?.email }
  );

  useEffect(() => {
    if (!loading && !isAdminLoading) {
      if (!user) {
        router.replace(`/login?from=${encodeURIComponent(pathname)}`);
      } else if (!isAdmin) {
        router.replace("/dashboard/user-home");
      }
    }
  }, [user, loading, isAdmin, isAdminLoading, router, pathname]);

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
