import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useFavourites = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: favourites = [], isLoading } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/favourites?email=${user?.email}`);
            return response.data;
        }
    })
    return [favourites, refetch, isLoading];
}

export default useFavourites
