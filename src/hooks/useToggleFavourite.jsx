import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import useFavourites from './useFavourites';

// Adds or removes a biodata from the signed-in user's favourites, updating the list optimistically.
const useToggleFavourite = (biodata) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [favourites] = useFavourites();

    const queryKey = ['favourites', user?.email];
    const existing = favourites.find((f) => f.favouriteId === biodata?._id);
    const isOwn = !!user?.email && user.email === biodata?.userEmail;

    const mutation = useMutation({
        mutationFn: async () => {
            if (existing) {
                return axiosSecure.delete(`/favourites/${existing._id}`);
            }
            return axiosSecure.post('/favourites', {
                favouriteId: biodata._id,
                favouriteBiodataId: biodata.biodataId,
                email: user.email,
                favouriteName: biodata.name,
                favouriteProfileImage: biodata.profileImage,
                favouriteEmail: biodata.userEmail,
            });
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old = []) =>
                existing
                    ? old.filter((f) => f._id !== existing._id)
                    : [...old, { _id: `optimistic-${biodata._id}`, favouriteId: biodata._id }]
            );
            return { previous, removing: !!existing };
        },
        onError: (err, _vars, context) => {
            queryClient.setQueryData(queryKey, context?.previous);
            toast.error(err.response?.data?.message || "Couldn't update favourites. Please try again.");
        },
        onSuccess: (_res, _vars, context) => {
            toast.success(context?.removing ? 'Removed from favourites' : `${biodata.name} saved to favourites`);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
    });

    const toggle = () => {
        if (!user) {
            toast.info('Sign in to save favourites');
            navigate('/login', { state: { from: location } });
            return;
        }
        if (isOwn) {
            toast.info("That's your own profile");
            return;
        }
        mutation.mutate();
    };

    return { isFavourite: !!existing, toggle, isPending: mutation.isPending, isOwn };
};

export default useToggleFavourite;
