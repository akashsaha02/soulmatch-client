import { api } from "@/store/api";
import type { Favourite } from "@/shared/types";

export const favouritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavourites: builder.query<Favourite[], string | undefined>({
      query: (email) => `/favourites?email=${email ?? ""}`,
      providesTags: ["Favourites"],
    }),
    addFavourite: builder.mutation<
      unknown,
      { email: string; favouriteEmail: string; favouriteBiodataId: string }
    >({
      query: (body) => ({ url: "/favourites", method: "POST", body }),
      invalidatesTags: ["Favourites"],
    }),
    removeFavourite: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/favourites/${id}`, method: "DELETE" }),
      invalidatesTags: ["Favourites"],
    }),
  }),
});

export const {
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} = favouritesApi;
