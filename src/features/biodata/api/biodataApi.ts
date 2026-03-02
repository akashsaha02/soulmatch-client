import { api } from "@/store/api";
import type { Biodata, BiodatasResponse, BiodataSearchParams } from "@/shared/types";

export const biodataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBiodatas: builder.query<BiodatasResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        const p = params ?? {};
        const qs = new URLSearchParams();
        if (p.page) qs.set("page", String(p.page));
        if (p.limit) qs.set("limit", String(p.limit));
        return `/biodatas${qs.toString() ? `?${qs}` : ""}`;
      },
      providesTags: ["Biodatas"],
    }),

    searchBiodatas: builder.query<BiodatasResponse, BiodataSearchParams>({
      query: (params) => {
        const qs = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== "") qs.set(k, String(v));
        });
        return `/biodatas/search?${qs}`;
      },
      providesTags: ["Biodatas"],
    }),

    getBiodataSuggestions: builder.query<Biodata[], { email: string; limit?: number }>({
      query: ({ email, limit = 10 }) =>
        `/biodatas/suggestions?email=${email}&limit=${limit}`,
      providesTags: ["Biodatas"],
    }),

    getRecentBiodatas: builder.query<Biodata[], void>({
      query: () => "/biodatas/recent",
      providesTags: ["Biodatas"],
    }),

    getBiodataByEmail: builder.query<Biodata | null, string>({
      query: (email) => `/biodatas/${email}`,
      providesTags: (_result, _error, email) => [{ type: "Biodata", id: email }],
    }),

    getBiodataDetails: builder.query<Biodata, string>({
      query: (id) => `/biodatas/details/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Biodata", id }],
    }),

    createOrUpdateBiodata: builder.mutation<{ insertedId?: string; modifiedCount?: number }, Partial<Biodata>>({
      query: (body) => ({ url: "/biodatas", method: "POST", body }),
      invalidatesTags: ["Biodatas", "Biodata"],
    }),

    addBiodataPhoto: builder.mutation<unknown, { id: string; url: string }>({
      query: ({ id, url }) => ({
        url: `/biodatas/${id}/photos`,
        method: "POST",
        body: { url },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Biodata", id }],
    }),

    removeBiodataPhoto: builder.mutation<unknown, { id: string; url: string }>({
      query: ({ id, url }) => ({
        url: `/biodatas/${id}/photos`,
        method: "DELETE",
        body: { url },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Biodata", id }],
    }),

    setPrimaryPhoto: builder.mutation<unknown, { id: string; url: string }>({
      query: ({ id, url }) => ({
        url: `/biodatas/${id}/photos/primary`,
        method: "PATCH",
        body: { url },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Biodata", id }],
    }),
  }),
});

export const {
  useGetBiodatasQuery,
  useSearchBiodatasQuery,
  useGetBiodataSuggestionsQuery,
  useGetRecentBiodatasQuery,
  useGetBiodataByEmailQuery,
  useGetBiodataDetailsQuery,
  useCreateOrUpdateBiodataMutation,
  useAddBiodataPhotoMutation,
  useRemoveBiodataPhotoMutation,
  useSetPrimaryPhotoMutation,
} = biodataApi;
