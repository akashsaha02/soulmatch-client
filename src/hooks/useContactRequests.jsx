import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useContactRequest = (isAdmin = false) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: requests = [], isLoading } = useQuery({
    queryKey: ['contact-requests', user?.email],
    queryFn: async () => {
      const endpoint = isAdmin
        ? '/admin/contact-requests'
        : `/contact-requests?email=${user?.email}`;
      const response = await axiosSecure.get(endpoint);
      return response.data;
    },
    enabled: !!user?.email, // Ensure query doesn't run until user is loaded
  });

  return { requests, refetch, isLoading };
};

export default useContactRequest;
