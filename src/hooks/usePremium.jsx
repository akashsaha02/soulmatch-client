import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axiosSecure.get(`/users/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  const isPremium = userData?.role === "premium";

  return [isPremium, userData, isLoading];
};

export default usePremium;
