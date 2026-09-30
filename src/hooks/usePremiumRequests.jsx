import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

// Admin-only: every premium request.
const usePremiumReq = () => {
  const axiosSecure = useAxiosSecure();

  const { data: premiumReq = [], isLoading: loading, refetch: refetchPremiumReq } = useQuery({
    queryKey: ['premium-requests'],
    queryFn: async () => {
      const response = await axiosSecure.get('/request-premium');
      return response.data;
    },
  });

  return { premiumReq, loading, refetchPremiumReq };
};

export default usePremiumReq;
