import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import { Helmet } from "react-helmet";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Items per page

    const { data, refetch } = useQuery({
        queryKey: ["users", searchTerm, page],
        queryFn: async () => {
            const response = await axiosSecure.get("/users", {
                params: { search: searchTerm, page, limit },
            });
            return response.data;
        },
        keepPreviousData: true, // Avoid flickering during pagination
    });


    const users = data?.users || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to the first page on new search
    };

    const handleRoleChange = (id, email, newRole) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `The user will be assigned the role of ${newRole}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Make ${newRole}!`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/role/${id}`, { role: newRole, email })
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Role Updated!",
                                text: `User role has been updated to ${newRole}.`,
                                icon: "success",
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("Error updating role:", err);
                        Swal.fire({
                            title: "Failed!",
                            text: "Failed to update user role.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("Error deleting user:", err);
                        Swal.fire({
                            title: "Failed!",
                            text: "Failed to delete user.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Manage Users | Dashboard</title>
            </Helmet>
            <SectionTitleHome heading="All Users" subHeading="Manage all users" />
            <div className="max-w-6xl mx-auto">
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 px-4 justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                    />

                    <div className="">
                        <p className="">Total Users: ({users.length})</p>
                    </div>
                </div>

                <div className="overflow-x-auto px-4">
                    <table className="table-auto w-full border-collapse border border-gray-300 rounded-xl">
                        {/* Table Head */}
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">#</th>
                                <th className="px-4 py-2 border border-gray-300">Name</th>
                                <th className="px-4 py-2 border border-gray-300">Email</th>
                                <th className="px-4 py-2 border border-gray-300">Role</th>
                                <th className="px-4 py-2 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="text-center">
                                    <td className="px-4 py-2 border border-gray-300">{index + 1 + (page - 1) * limit}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.role || "Normal User"}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <div className="flex justify-center gap-2">
                                            {/* Role Buttons */}
                                            {user.role !== "admin" && (
                                                <Button
                                                    variant="primary"
                                                    className="bg-green-500"
                                                    size="sm"
                                                    onClick={() => handleRoleChange(user._id, user.email, "admin")}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                            {user.role !== "premium" && (
                                                <Button
                                                    variant="secondary"
                                                    className="bg-yellow-500"
                                                    size="sm"
                                                    onClick={() => handleRoleChange(user._id, user.email, "premium")}
                                                >
                                                    Make Premium
                                                </Button>
                                            )}
                                            {user.role !== "normal" && (
                                                <Button
                                                    variant="tertiary"
                                                    className="bg-blue-500"
                                                    size="sm"
                                                    onClick={() => handleRoleChange(user._id, user.email, "normal")}
                                                >
                                                    Make Normal
                                                </Button>
                                            )}
                                            {/* Delete Button */}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            variant={page === pageNumber ? "primary" : "secondary"}
                            size="sm"
                            onClick={() => setPage(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;

