import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Crown, MoreHorizontal, Search, ShieldCheck, Trash2, UserRound, Users } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { confirmAction } from "@/lib/confirm";
import { DashboardPage, EmptyState, Panel } from "@/components/dashboard/DashboardKit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roleMeta = {
    admin: { label: "Admin", variant: "secondary", icon: ShieldCheck },
    premium: { label: "Premium", variant: "premium", icon: Crown },
    normal: { label: "Member", variant: "outline", icon: UserRound },
};

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    // Debounce the search box
    useEffect(() => {
        const id = setTimeout(() => {
            setSearchTerm(searchInput.trim());
            setPage(1);
        }, 300);
        return () => clearTimeout(id);
    }, [searchInput]);

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["users", searchTerm, page],
        queryFn: async () => {
            const response = await axiosSecure.get("/users", { params: { search: searchTerm, page, limit } });
            return response.data;
        },
        placeholderData: keepPreviousData,
    });

    const users = data?.users || [];

    const handleRoleChange = async (user, newRole) => {
        const ok = await confirmAction({
            title: `Make ${user.name || user.email} ${roleMeta[newRole].label.toLowerCase()}?`,
            text: newRole === "admin" ? "Admins can manage every user and request." : "Their access will change immediately.",
            confirmText: "Yes, update role",
            icon: "question",
        });
        if (!ok) return;
        try {
            const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole, email: user.email });
            if (res.data.modifiedCount > 0) {
                toast.success(`Role updated to ${roleMeta[newRole].label}`);
                refetch();
            }
        } catch {
            toast.error("Failed to update user role.");
        }
    };

    const handleDeleteUser = async (user) => {
        const ok = await confirmAction({ title: `Delete ${user.name || user.email}?`, text: "This permanently removes their account.", confirmText: "Delete user" });
        if (!ok) return;
        try {
            const res = await axiosSecure.delete(`/users/${user._id}`);
            if (res.data.deletedCount > 0) {
                toast.success("User deleted");
                refetch();
            }
        } catch {
            toast.error("Failed to delete user.");
        }
    };

    return (
        <DashboardPage title="Manage users" description={data ? `${data.totalUsers} registered users` : "Loading users…"}>
            <Panel
                actions={
                    <div className="relative w-full sm:w-72">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search name or email"
                            aria-label="Search users"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="rounded-full pl-11"
                        />
                    </div>
                }
                title="All users"
            >
                {isLoading ? (
                    <div className="space-y-3 p-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}</div>
                ) : users.length === 0 ? (
                    <EmptyState icon={Users} title="No users found" description="Try a different name or email." />
                ) : (
                    <Table className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => {
                                const role = roleMeta[user.role] || roleMeta.normal;
                                const isSelf = user.email === currentUser?.email;
                                return (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <p className="font-semibold">{user.name || "—"}{isSelf && <span className="ml-2 text-xs font-normal text-muted-foreground">(you)</span>}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={role.variant}><role.icon /> {role.label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name || user.email}`} disabled={isSelf}>
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5">
                                                    {Object.entries(roleMeta)
                                                        .filter(([key]) => key !== (user.role || "normal"))
                                                        .map(([key, meta]) => (
                                                            <DropdownMenuItem key={key} className="rounded-lg" onClick={() => handleRoleChange(user, key)}>
                                                                <meta.icon /> Make {meta.label.toLowerCase()}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="rounded-lg text-destructive focus:text-destructive" onClick={() => handleDeleteUser(user)}>
                                                        <Trash2 /> Delete user
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </Panel>
            <Pagination className="mt-6" page={page} totalPages={data?.totalPages || 0} onPageChange={setPage} />
        </DashboardPage>
    );
};

export default AllUsers;
