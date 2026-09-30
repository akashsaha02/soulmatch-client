import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

// Server-side filtered + paginated biodata search. `params` mirrors the /biodatas query string.
const useBiodataSearch = (params) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ['biodatas', 'search', params],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas', { params: { limit: 12, ...params } });
            return res.data;
        },
        placeholderData: keepPreviousData,
    });
};

export default useBiodataSearch;
