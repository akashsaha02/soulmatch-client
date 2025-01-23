import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user,loading } = useAuth(); // Access user context
  const axiosSecure = useAxiosSecure(); // Secure Axios instance

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading, // Only run the query if user.email is valid
    queryFn: async () => {
      if (!user?.email) return false; // Prevent query if no email
      const response = await axiosSecure.get(`/users/admin/${user.email}`);
      return response.data || false;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
