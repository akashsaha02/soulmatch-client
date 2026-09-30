import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

// Every biodata (unpaginated). Used for small featured/recommendation lists; browsing uses useBiodataSearch.
const useBiodatas = () => {
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], isLoading } = useQuery({
        queryKey: ['biodatas', 'all'],
        queryFn: async () => (await axiosPublic.get('/biodatas')).data,
        staleTime: 60_000,
    });

    return [biodatas, isLoading];
}

export default useBiodatas
