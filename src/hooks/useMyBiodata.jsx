import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

// The signed-in user's own biodata (null if they haven't created one yet).
const useMyBiodata = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: myBiodata = null, isLoading, refetch } = useQuery({
        queryKey: ['my-biodata', user?.email],
        enabled: !!user?.email,
        queryFn: async () => (await axiosPublic.get(`/biodatas/${user.email}`)).data || null,
    });

    return [myBiodata, isLoading, refetch];
};

export default useMyBiodata;
