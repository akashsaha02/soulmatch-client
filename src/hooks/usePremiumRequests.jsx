import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePremiumReq = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all premium requests
  const {
    data: premiumReq = [],
    isLoading: loadingPremiumReq,
    refetch: refetchPremiumReq,
  } = useQuery({
    queryKey: ['premium-requests'],
    queryFn: async () => {
      const response = await axiosSecure.get('/request-premium');
      return response.data;
    },
  });

  // Fetch specific premium request for the current user
  const {
    data: myPremiumReq = null,
    isLoading: loadingMyPremiumReq,
    refetch: refetchMyPremiumReq,
  } = useQuery({
    queryKey: ['my-premium-request', user?.email],
    queryFn: async () => {
      if (!user?.email) return null; // Skip fetching if no user email
      const response = await axiosSecure.get(`/request-premium/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Fetch only when user email is available
  });

  // Combine loading states
  const loading = loadingPremiumReq || loadingMyPremiumReq;

  return {
    premiumReq,
    loading,
    myPremiumReq,
    refetchPremiumReq,
    refetchMyPremiumReq,
  };
};

export default usePremiumReq;
