import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: "users",
        queryFn: async () => {
            const response = await axiosSecure.get("/users");
            return response.data;
        },
    });

    const handleRoleChange = (id, newRole) => {
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
                    .patch(`/users/role/${id}`, { role: newRole })
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
            <div className="text-center text-2xl font-semibold mb-4">All Users</div>

            <div className="max-w-5xl mx-auto">
                <div className="text-lg font-medium mb-2">Total Users ({users.length})</div>

                <div className="overflow-x-auto">
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
                                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.role || "Normal User"}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <div className="flex justify-center gap-2">
                                            {/* Role Buttons */}
                                            {
                                                user.role === "admin" ? null : (
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => handleRoleChange(user._id, "admin")}
                                                    >
                                                        Make Admin
                                                    </Button>)
                                            }
                                            {
                                                user.role === "premium" ? null : (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleRoleChange(user._id, "premium")}
                                                    >
                                                        Make Premium
                                                    </Button>)
                                            }
                                            {
                                                user.role === "normal" ? null : (
                                                    <Button
                                                        variant="tertiary"
                                                        size="sm"
                                                        onClick={() => handleRoleChange(user._id, "normal")}
                                                    >
                                                        Make Normal
                                                    </Button>)
                                            }
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
            </div>
        </div>
    );
};

export default AllUsers;
