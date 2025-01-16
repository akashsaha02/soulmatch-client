import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useFavourites = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: favourites = [] } = useQuery({
        queryKey: ['favourites', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/favourites?email=${user?.email}`);
            return response.data;
        }
    })
    return [favourites, refetch];
}

export default useFavourites

